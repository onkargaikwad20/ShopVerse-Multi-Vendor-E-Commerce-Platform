package com.shopverse.adminService.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import java.util.List;
import java.util.Map;

// Points to Gateway (localhost:8080), logic routes to user-service
@FeignClient(name = "api-gateway", url = "${gateway.url}")
public interface UserClient {

    @GetMapping("/user-service/api/user/all") // Route via Gateway -> user-service /api/user/all
    List<Map<String, Object>> getAllUsers(@RequestHeader("Authorization") String token);
}
