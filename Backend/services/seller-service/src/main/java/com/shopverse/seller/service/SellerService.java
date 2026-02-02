package com.shopverse.seller.service;

import com.shopverse.seller.dto.*;
import com.shopverse.seller.entity.Seller;
import com.shopverse.seller.entity.Shop;

import java.util.Map;

public interface SellerService {

    Seller createSellerProfile(CreateSellerRequest req, Long userId);

    Shop createShop(CreateShopRequest req, Long userId);

    StripeAccountResponse createStripeAccount(Long userId);

    OnboardingLinkResponse generateOnboardingLink(
            Long userId,
            String successUrl,
            String refreshUrl);

    void handleStripeWebhook(Map<String, Object> event);

    SellerDashboardResponse getSellerDashboard(Long userId);

    Seller updateSellerProfile(UpdateSellerRequest req, Long userId);

    java.util.List<Seller> getPendingSellers();

    Seller verifySeller(Long sellerId, com.shopverse.seller.entity.VerificationStatus status);
}
