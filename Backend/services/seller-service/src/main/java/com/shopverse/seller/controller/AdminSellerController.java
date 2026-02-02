package com.shopverse.seller.controller;

import com.shopverse.seller.entity.Seller;
import com.shopverse.seller.entity.VerificationStatus;
import com.shopverse.seller.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/seller/admin")
@RequiredArgsConstructor
public class AdminSellerController {

    private final SellerService sellerService;

    @GetMapping("/pending")
    public List<Seller> getPendingSellers(@RequestHeader("X-User-Role") String role) {
        if (!"ADMIN".equals(role))
            throw new RuntimeException("Access Denied");
        return sellerService.getPendingSellers();
    }

    @PutMapping("/{sellerId}/verify")
    public Seller verifySeller(
            @PathVariable("sellerId") Long sellerId,
            @RequestBody Map<String, String> body,
            @RequestHeader("X-User-Role") String role) {

        System.out.println("DEBUG: verifySeller ID=" + sellerId);
        System.out.println("DEBUG: Role=" + role);
        System.out.println("DEBUG: Body=" + body);

        if (!"ADMIN".equals(role))
            throw new RuntimeException("Access Denied");

        String statusStr = body.get("status");
        if (statusStr == null)
            throw new IllegalArgumentException("Status required");

        VerificationStatus status = VerificationStatus.valueOf(statusStr.toUpperCase());

        try {
            return sellerService.verifySeller(sellerId, status);
        } catch (Exception e) {
            System.out.println("DEBUG: Error in verifySeller: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}
