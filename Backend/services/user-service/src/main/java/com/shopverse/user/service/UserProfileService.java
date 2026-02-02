package com.shopverse.user.service;

import com.shopverse.user.entity.UserProfile;
import com.shopverse.user.repository.UserProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserProfileRepository repository;

    public UserProfile getOrCreate(Long userId, String role) {

        return repository.findByUserId(userId)
                .orElseGet(() -> {
                    UserProfile profile = UserProfile.builder()
                            .userId(userId)
                            .role(role)
                            .build();
                    return repository.save(profile);
                });

    }

    public UserProfile updateProfile(Long userId, String role, com.shopverse.user.dto.UpdateProfileRequest req) {
        UserProfile profile = repository.findByUserId(userId)
                .orElseGet(() -> UserProfile.builder()
                        .userId(userId)
                        .role(role)
                        .build());

        if (req.getName() != null)
            profile.setName(req.getName());
        if (req.getEmail() != null)
            profile.setEmail(req.getEmail());
        if (req.getAddress() != null)
            profile.setAddress(req.getAddress());

        return repository.save(profile);
    }

    public java.util.List<UserProfile> getAllProfiles() {
        return repository.findAll();
    }
}
