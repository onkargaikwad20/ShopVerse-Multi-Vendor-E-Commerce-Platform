package com.shopverse.adminService.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@FeignClient(name = "product-service", url = "${gateway.url}")
public interface ProductClient {

    @GetMapping("/product-service/api/products/admin/pending")
    List<Map<String, Object>> getPendingProducts(@RequestHeader("Authorization") String token);

    @PutMapping("/product-service/api/products/admin/{id}/verify")
    Map<String, Object> verifyProduct(
            @PathVariable("id") Long id,
            @RequestBody Map<String, String> body,
            @RequestHeader("Authorization") String token);
}
