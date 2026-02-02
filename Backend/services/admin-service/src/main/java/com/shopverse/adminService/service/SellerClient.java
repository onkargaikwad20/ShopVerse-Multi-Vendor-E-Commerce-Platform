package com.shopverse.adminService.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@FeignClient(name = "seller-service", url = "${gateway.url}")
public interface SellerClient {

    @GetMapping("/seller-service/api/seller/admin/pending")
    List<Map<String, Object>> getPendingSellers(@RequestHeader("Authorization") String token);

    @PutMapping("/seller-service/api/seller/admin/{sellerId}/verify")
    Map<String, Object> verifySeller(
            @PathVariable("sellerId") Long sellerId,
            @RequestBody Map<String, String> body,
            @RequestHeader("Authorization") String token);
}
