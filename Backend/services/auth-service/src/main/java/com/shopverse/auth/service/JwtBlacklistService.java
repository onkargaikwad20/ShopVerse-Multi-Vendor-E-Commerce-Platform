package com.shopverse.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JwtBlacklistService {

    // In-memory blacklist for local development (Token -> Expiry Time)
    private final java.util.concurrent.ConcurrentHashMap<String, Long> blacklist = new java.util.concurrent.ConcurrentHashMap<>();

    public void blacklistToken(String token, long expiryMillis) {
        long expiryTime = System.currentTimeMillis() + expiryMillis;
        blacklist.put(token, expiryTime);

        // Cleanup expired tokens occasionally (simple implementation)
        cleanup();
    }

    public boolean isBlacklisted(String token) {
        Long expiryTime = blacklist.get(token);
        if (expiryTime == null) {
            return false;
        }

        if (System.currentTimeMillis() > expiryTime) {
            blacklist.remove(token);
            return false;
        }

        return true;
    }

    private void cleanup() {
        long now = System.currentTimeMillis();
        blacklist.entrySet().removeIf(entry -> now > entry.getValue());
    }
}
