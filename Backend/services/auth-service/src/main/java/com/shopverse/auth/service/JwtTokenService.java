package com.shopverse.auth.service;

import com.shopverse.auth.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Service
public class JwtTokenService {

    // ✅ CORRECT PROPERTY PATHS
    @Value("${app.jwt.secret}")
    private String secret;

    @Value("${app.jwt.expiration}")
    private long expirationMillis;

    // ✅ Proper key creation (HS256 requires ≥32 bytes)
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // ================= GENERATE TOKEN =================
    public String generateToken(User user) {

        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMillis);

        return Jwts.builder()
                .setSubject(user.getId().toString())
                .claim("role", user.getRole())
                .setIssuedAt(now)
                .setExpiration(expiry)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256) // ✅ REQUIRED
                .compact();
    }

    // ================= TOKEN VALIDITY =================
    public long getRemainingValidity(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        long expiryTime = claims.getExpiration().getTime();
        long now = System.currentTimeMillis();

        return Math.max(expiryTime - now, 0);
    }
}
