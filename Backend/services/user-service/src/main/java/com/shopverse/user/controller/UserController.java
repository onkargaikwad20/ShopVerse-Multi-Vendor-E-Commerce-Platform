package com.shopverse.user.controller;

import com.shopverse.user.entity.UserProfile;
import com.shopverse.user.service.UserProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserProfileService userProfileService;

    @GetMapping("/me")
    public UserProfile me(
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String role) {
        return userProfileService.getOrCreate(userId, role);
    }

    @org.springframework.web.bind.annotation.PutMapping("/profile")
    public UserProfile updateProfile(
            @org.springframework.web.bind.annotation.RequestBody com.shopverse.user.dto.UpdateProfileRequest req,
            @RequestHeader("X-User-Id") Long userId,
            @RequestHeader("X-User-Role") String role) {

        System.out.println(">>> UPDATE PROFILE REQUEST RECEIVED");
        System.out.println("User ID: " + userId);
        System.out.println("Role: " + role);
        System.out.println("Payload Name: " + req.getName());
        System.out.println("Payload Email: " + req.getEmail());
        System.out.println("Payload Address: " + req.getAddress());

        return userProfileService.updateProfile(userId, role, req);
    }

    @GetMapping("/all")
    public java.util.List<UserProfile> getAllUsers() {
        return userProfileService.getAllProfiles();
    }
}
