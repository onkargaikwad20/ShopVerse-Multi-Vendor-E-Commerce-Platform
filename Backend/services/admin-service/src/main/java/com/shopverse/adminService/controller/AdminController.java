package com.shopverse.adminService.controller;

import com.shopverse.adminService.service.UserClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserClient userClient;
    private final com.shopverse.adminService.service.SellerClient sellerClient;

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(userClient.getAllUsers(token));
    }

    @GetMapping("/sellers/pending")
    public ResponseEntity<List<Map<String, Object>>> getPendingSellers(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(sellerClient.getPendingSellers(token));
    }

    @org.springframework.web.bind.annotation.PutMapping("/sellers/{sellerId}/verify")
    public ResponseEntity<Map<String, Object>> verifySeller(
            @org.springframework.web.bind.annotation.PathVariable("sellerId") Long sellerId,
            @org.springframework.web.bind.annotation.RequestBody Map<String, String> body,
            @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(sellerClient.verifySeller(sellerId, body, token));
    }

    private final com.shopverse.adminService.service.ProductClient productClient;

    @GetMapping("/products/pending")
    public ResponseEntity<List<Map<String, Object>>> getPendingProducts(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(productClient.getPendingProducts(token));
    }

    @org.springframework.web.bind.annotation.PutMapping("/products/{id}/verify")
    public ResponseEntity<Map<String, Object>> verifyProduct(
            @org.springframework.web.bind.annotation.PathVariable("id") Long id,
            @org.springframework.web.bind.annotation.RequestBody Map<String, String> body,
            @RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(productClient.verifyProduct(id, body, token));
    }

}
