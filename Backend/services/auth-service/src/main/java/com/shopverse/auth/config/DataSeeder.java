package com.shopverse.auth.config;

import com.shopverse.auth.entity.User;
import com.shopverse.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Create Default Admin if not exists
        if (!userRepository.findByPhone("9999999999").isPresent()) {
            User admin = new User();
            admin.setPhone("9999999999");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            admin.setVerified(true);
            userRepository.save(admin);
            System.out.println("✅ ADMIN USER CREATED: Phone: 9999999999 | Pass: admin123");
        }
    }
}
