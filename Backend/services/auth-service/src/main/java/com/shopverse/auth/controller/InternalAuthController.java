package com.shopverse.auth.controller;

import com.shopverse.auth.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/internal/auth")
@RequiredArgsConstructor
public class InternalAuthController {

    private final UserService userService;


    @Value("${app.internal.auth-key}")
    private String authInternalKey;

    @PostMapping("/upgrade-role")
    public void upgradeRole(
            @RequestHeader("X-INTERNAL-KEY") String internalKey,
            @RequestParam(name = "userId") Long userId,
            @RequestParam(name = "role") String role
    ) {

        if (!authInternalKey.equals(internalKey)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Invalid internal key"
            );
        }

        userService.updateRole(userId, role);
    }
}
