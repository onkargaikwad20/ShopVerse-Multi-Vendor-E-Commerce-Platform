package com.shopverse.seller.service;

import com.shopverse.seller.client.AuthInternalClient;
import com.shopverse.seller.dto.*;
import com.shopverse.seller.entity.Category;
import com.shopverse.seller.entity.Seller;
import com.shopverse.seller.entity.Shop;
import com.shopverse.seller.entity.VerificationStatus;
import com.shopverse.seller.repository.SellerRepository;
import com.shopverse.seller.repository.ShopRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {

    private final SellerRepository sellerRepository;
    private final ShopRepository shopRepository;
    private final AuthInternalClient authInternalClient;

    @Value("${app.internal.auth-key}")
    private String internalKey;

    @Value("${stripe.secret:}")
    private String stripeSecret;

    private void ensureStripeConfigured() {
        if (stripeSecret == null || stripeSecret.isBlank()) {
            throw new IllegalStateException("Stripe secret not configured");
        }
        com.stripe.Stripe.apiKey = stripeSecret;
    }

    @Transactional
    @Override
    public Seller createSellerProfile(CreateSellerRequest req, Long userId) {

        if (sellerRepository.existsByUserId(userId)) {
            throw new IllegalArgumentException("Seller profile already exists");
        }

        Seller seller = new Seller();
        seller.setUserId(userId);
        seller.setName(req.getName());
        seller.setEmail(req.getEmail());
        seller.setPhone(req.getPhone());
        seller.setAddress(req.getAddress());
        seller.setBusinessDetails(req.getBusinessDetails());
        seller.setKycStatus(VerificationStatus.PENDING);
        seller.setCreatedAt(Instant.now());

        sellerRepository.save(seller);

        authInternalClient.upgradeUserRole(
                internalKey, // MUST MATCH
                userId,
                "SELLER");

        return seller;
    }

    @Transactional
    @Override
    public Shop createShop(CreateShopRequest req, Long userId) {

        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("Seller profile not found"));

        Shop shop = new Shop();
        shop.setSeller(seller);
        shop.setShopName(req.getShopName());
        shop.setDescription(req.getDescription());
        shop.setAddress(req.getAddress());
        shop.setShopBannerUrl(req.getShopBannerUrl());


        if (req.getCategories() != null) {
            req.getCategories().forEach(catName -> {
                Category category = new Category();
                category.setName(catName);
                category.setShop(shop);
                shop.getCategories().add(category);
            });
        }

        return shopRepository.save(shop);
    }

    @Transactional
    @Override
    public StripeAccountResponse createStripeAccount(Long userId) {
        ensureStripeConfigured();

        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("Seller not found"));

        if (seller.getStripeAccountId() != null) {
            return new StripeAccountResponse(
                    seller.getStripeAccountId(),
                    "Stripe account already exists");
        }

        try {
            Map<String, Object> params = new HashMap<>();
            params.put("type", "express");

            Account account = Account.create(params);
            seller.setStripeAccountId(account.getId());
            sellerRepository.save(seller);

            return new StripeAccountResponse(account.getId(), "Stripe account created");

        } catch (StripeException e) {
            throw new RuntimeException("Stripe error", e);
        }
    }

    @Transactional
    @Override
    public OnboardingLinkResponse generateOnboardingLink(
            Long userId,
            String successUrl,
            String refreshUrl) {
        ensureStripeConfigured();

        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("Seller profile not found"));

        if (seller.getStripeAccountId() == null) {
            throw new IllegalStateException("Stripe account missing. Create it first.");
        }

        try {
            Map<String, Object> params = new HashMap<>();
            params.put("account", seller.getStripeAccountId());
            params.put("refresh_url", refreshUrl);
            params.put("return_url", successUrl);
            params.put("type", "account_onboarding");

            AccountLink link = AccountLink.create(params);

            OnboardingLinkResponse resp = new OnboardingLinkResponse();
            resp.setUrl(link.getUrl());
            resp.setExpiresAt(
                    link.getExpiresAt() == null ? null : link.getExpiresAt().longValue());

            return resp;

        } catch (StripeException e) {
            throw new RuntimeException("Failed to generate onboarding link", e);
        }
    }

    @Override
    @Transactional
    public void handleStripeWebhook(Map<String, Object> event) {

        String type = (String) event.get("type");
        Map<String, Object> data = (Map<String, Object>) event.get("data");
        Map<String, Object> object = (Map<String, Object>) data.get("object");

        if ("account.updated".equals(type)) {

            String stripeAccountId = (String) object.get("id");
            Boolean chargesEnabled = (Boolean) object.get("charges_enabled");
            Boolean payoutsEnabled = (Boolean) object.get("payouts_enabled");

            Seller seller = sellerRepository.findByStripeAccountId(stripeAccountId)
                    .orElseThrow(() -> new NoSuchElementException("Seller not found for Stripe account"));

            if (Boolean.TRUE.equals(chargesEnabled) && Boolean.TRUE.equals(payoutsEnabled)) {
                seller.setKycStatus(VerificationStatus.APPROVED);
            } else {
                seller.setKycStatus(VerificationStatus.PENDING);
            }

            sellerRepository.save(seller);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public SellerDashboardResponse getSellerDashboard(Long userId) {

        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("Seller profile not found"));

        SellerDashboardResponse resp = new SellerDashboardResponse();
        resp.setSellerId(seller.getId());
        resp.setName(seller.getName());
        resp.setEmail(seller.getEmail());
        resp.setPhone(seller.getPhone());
        resp.setKycStatus(seller.getKycStatus().name());

        shopRepository.findBySellerId(seller.getId())
                .ifPresent(shop -> resp.setShop(ShopResponse.from(shop)));

        resp.setProductsCreated(0);
        resp.setEarnings(
                new EarningsResponse(
                        BigDecimal.ZERO,
                        BigDecimal.ZERO,
                        BigDecimal.ZERO));

        return resp;
    }

    @Transactional
    @Override
    public Seller updateSellerProfile(UpdateSellerRequest req, Long userId) {

        Seller seller = sellerRepository.findByUserId(userId)
                .orElseThrow(() -> new NoSuchElementException("Seller profile not found"));

        if (req.getName() != null) {
            seller.setName(req.getName());
        }
        if (req.getPhone() != null) {
            seller.setPhone(req.getPhone());
        }
        if (req.getAddress() != null) {
            seller.setAddress(req.getAddress());
        }
        if (req.getBusinessDetails() != null) {
            seller.setBusinessDetails(req.getBusinessDetails());
        }

        seller.setUpdatedAt(Instant.now());
        return sellerRepository.save(seller);
    }

    @Override
    @Transactional(readOnly = true)
    public java.util.List<Seller> getPendingSellers() {
        return sellerRepository.findByKycStatus(VerificationStatus.PENDING);
    }

    @Override
    @Transactional
    public Seller verifySeller(Long sellerId, VerificationStatus status) {
        Seller seller = sellerRepository.findById(sellerId)
                .orElseThrow(() -> new NoSuchElementException("Seller not found"));

        seller.setKycStatus(status);

        // Use repo to save
        return sellerRepository.save(seller);
    }

}
