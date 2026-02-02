package com.shopverse.seller.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "auth-service", url = "http://localhost:8081")
public interface AuthInternalClient {

    @PostMapping("/api/internal/auth/upgrade-role")
    void upgradeUserRole(
            @RequestHeader("X-INTERNAL-KEY") String internalKey,
            @RequestParam("userId") Long userId,
            @RequestParam("role") String role
    );
}
