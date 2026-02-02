package com.shopverse.auth.service;

import com.shopverse.auth.dto.AuthResponse;
import com.shopverse.auth.dto.LoginRequest;
import com.shopverse.auth.dto.RegisterRequest;
import com.shopverse.auth.dto.VerifyOtpRequest;
import com.shopverse.auth.entity.User;
import com.shopverse.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shopverse.common.exceptions.ConflictException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;
    private final JwtBlacklistService jwtBlacklistService;
    private final OtpService otpService;

    // ================= REGISTER =================
    @org.springframework.transaction.annotation.Transactional
    public AuthResponse register(RegisterRequest request) {

        java.util.Optional<User> existingUser = userRepository.findByPhone(request.getPhone());

        User user;
        if (existingUser.isPresent()) {
            User found = existingUser.get();
            if (found.isVerified()) {
                throw new ConflictException("User already exists");
            }
            // User exists but is not verified -> Resend OTP
            user = found;
            // Update password in case they changed it
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            userRepository.save(user);
        } else {
            // New user
            user = new User();
            user.setPhone(request.getPhone());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole("PENDING");
            user.setVerified(false);
            userRepository.save(user);
        }

        otpService.sendOtp(user.getPhone());

        return AuthResponse.builder()
                .token("OTP_SENT")
                .userId(user.getId())
                .role(null)
                .build();
    }

    // ================= VERIFY OTP =================
    public AuthResponse verifyOtp(VerifyOtpRequest request) {

        // 1️⃣ Validate OTP (Redis)
        otpService.verifyOtp(request.getPhone(), request.getOtp());

        // 2️⃣ Fetch user
        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 3️⃣ Mark verified only once
        if (!user.isVerified()) {
            user.setVerified(true);
            user.setRole("USER"); // ✅ STRING role
            userRepository.save(user);
        }

        // 4️⃣ Generate JWT
        String jwtToken = jwtTokenService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .userId(user.getId())
                .role(user.getRole()) // ✅ NO .name()
                .build();
    }

    // ================= LOGIN =================
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByPhone(request.getPhone())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isVerified()) {
            throw new RuntimeException("OTP not verified");
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtTokenService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .userId(user.getId())
                .role(user.getRole())
                .build();
    }

    // ================= GUEST LOGIN =================
    public AuthResponse guestLogin() {
        User guest = new User();
        guest.setId(0L); // Dummy ID for guest
        guest.setRole("GUEST");

        String token = jwtTokenService.generateToken(guest);

        return AuthResponse.builder()
                .token(token)
                .userId(0L)
                .role("GUEST")
                .build();
    }

    // ================= LOGOUT =================
    public void logout(String token) {
        long remainingTime = jwtTokenService.getRemainingValidity(token);
        jwtBlacklistService.blacklistToken(token, remainingTime);
    }
}
