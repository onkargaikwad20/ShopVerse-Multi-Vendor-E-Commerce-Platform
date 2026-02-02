package com.shopverse.auth.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
// import java.time.Duration;

@Service
@RequiredArgsConstructor
public class OtpService {

    // private final StringRedisTemplate redisTemplate; // REMOVED REDIS

    // In-memory OTP storage: Phone -> OTP + Expiry
    private static final java.util.concurrent.ConcurrentHashMap<String, OtpEntry> otpStore = new java.util.concurrent.ConcurrentHashMap<>();

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.phone-number}")
    private String fromPhoneNumber;

    private static final int OTP_EXPIRY_MINUTES = 5;
    private static final SecureRandom RANDOM = new SecureRandom();

    @PostConstruct
    public void init() {
        System.out.println("====== TWILIO INIT START ======");
        System.out.println("Account SID: " + (accountSid != null ? accountSid : "NULL"));
        System.out.println("Auth Token: "
                + (authToken != null && authToken.length() > 5 ? "******" + authToken.substring(authToken.length() - 4)
                        : "INVALID/SHORT"));
        System.out.println("From Phone: " + fromPhoneNumber);

        try {
            Twilio.init(accountSid, authToken);
            System.out.println("Twilio SDK initialized successfully.");
        } catch (Exception e) {
            System.err.println("CRITICAL: Twilio init failed: " + e.getMessage());
            e.printStackTrace();
        }
        System.out.println("====== TWILIO INIT END ======");
    }

    public void sendOtp(String phone) {
        String formattedPhone = formatPhoneNumber(phone);

        System.out.println("Preparing to send OTP to: " + formattedPhone);

        // 1. Generate OTP
        String otp = String.format("%06d", RANDOM.nextInt(1_000_000));

        // 2. Save to In-Memory Map
        otpStore.put(formattedPhone, new OtpEntry(otp, System.currentTimeMillis() + (OTP_EXPIRY_MINUTES * 60 * 1000)));

        System.out.println("OTP generated and saved to Memory: " + otp);

        // 3. Send via Twilio SMS
        try {
            System.out.println("Sending Twilio Message...");
            Message message = Message.creator(
                    new PhoneNumber(formattedPhone),
                    new PhoneNumber(fromPhoneNumber),
                    "Your ShopVerse verification code is: " + otp).create();

            System.out.println("Twilio Message Sent! SID: " + message.getSid());
            System.out.println("Message Status: " + message.getStatus());
        } catch (Exception e) {
            System.err.println("Twilio Send Failed!");
            e.printStackTrace();
            throw new RuntimeException("Failed to send OTP via Twilio: " + e.getMessage());
        }
    }

    public void verifyOtp(String phone, String otp) {
        String formattedPhone = formatPhoneNumber(phone);

        OtpEntry entry = otpStore.get(formattedPhone);

        if (entry == null) {
            throw new RuntimeException("OTP not found or expired");
        }

        if (System.currentTimeMillis() > entry.expiryTime) {
            otpStore.remove(formattedPhone);
            throw new RuntimeException("OTP expired");
        }

        if (!entry.otp.equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        otpStore.remove(formattedPhone); // OTP single-use
    }

    private String formatPhoneNumber(String phone) {
        if (phone == null)
            return "";
        // Basic cleanup
        String cleaned = phone.replaceAll("\\s+", "").replaceAll("-", "");
        // Default to India (+91) if no country code provided
        if (!cleaned.startsWith("+")) {
            return "+91" + cleaned;
        }
        return cleaned;
    }

    // Helper class for Map value
    private static class OtpEntry {
        String otp;
        long expiryTime;

        OtpEntry(String otp, long expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }
    }
}
