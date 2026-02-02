package com.shopverse.auth.service;

import com.shopverse.auth.entity.User;
import com.shopverse.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void updateRole(Long userId, String role) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setRole(role);
        userRepository.save(user);
    }
}
