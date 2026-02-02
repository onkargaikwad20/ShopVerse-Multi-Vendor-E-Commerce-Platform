package com.shopverse.auth.controller;

import com.shopverse.auth.dto.*;
import com.shopverse.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(
            @RequestBody VerifyOtpRequest request) {
        return ResponseEntity.ok(authService.verifyOtp(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/guest-login")
    public ResponseEntity<AuthResponse> guestLogin() {
        return ResponseEntity.ok(authService.guestLogin());
    }


    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        authService.logout(token);

        return ResponseEntity.ok().build();
    }
}
