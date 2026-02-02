package com.shopverse.seller.controller;

import com.shopverse.seller.dto.*;
import com.shopverse.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/seller")
@RequiredArgsConstructor
public class SellerController {

    private final SellerService sellerService;

    @PostMapping("/create-profile")
    public SellerProfileResponse createProfile(
            @RequestBody CreateSellerRequest req,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String role
    ) {
        assertUser(role);
        return SellerProfileResponse.from(
                sellerService.createSellerProfile(req, userId)
        );
    }

    @PostMapping("/create-shop")
    public ShopResponse createShop(
            @RequestBody CreateShopRequest req,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String role
    ) {
        assertSeller(role);
        return ShopResponse.from(
                sellerService.createShop(req, userId)
        );
    }

    @PostMapping("/stripe/create-account")
    public StripeAccountResponse createStripeAccount(
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String role
    ) {
        assertSeller(role);
        return sellerService.createStripeAccount(userId);
    }

    @PostMapping("/stripe/onboarding-link")
    public OnboardingLinkResponse onboardingLink(
            @RequestBody Map<String, String> req,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String role
    ) {
        assertSeller(role);
        return sellerService.generateOnboardingLink(
                userId,
                req.get("successUrl"),
                req.get("refreshUrl")
        );
    }

    @GetMapping("/dashboard")
    public SellerDashboardResponse dashboard(
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String role
    ) {
        assertSeller(role);
        return sellerService.getSellerDashboard(userId);
    }

    @PutMapping("/profile/update")
    public SellerProfileResponse updateProfile(
            @RequestBody UpdateSellerRequest req,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String role
    ) {
        assertSeller(role);
        return SellerProfileResponse.from(
                sellerService.updateSellerProfile(req, userId)
        );
    }

    @PostMapping("/stripe/webhook")
    public void handleWebhook(@RequestBody Map<String, Object> event) {
        sellerService.handleStripeWebhook(event);
    }

    private void assertUser(String role) {
        if (!"USER".equals(role)) {
            throw new RuntimeException("Only SELLER can access this resource");
        }
    }
    private void assertSeller(String role) {
        if (!"SELLER".equals(role)) {
            throw new RuntimeException("Only SELLER can access this resource");
        }
    }
}
