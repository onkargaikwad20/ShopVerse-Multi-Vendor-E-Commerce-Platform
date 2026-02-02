package com.shopverse.adminService.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(csrf -> csrf.disable())
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**",
                                                                "/swagger-ui.html")
                                                .permitAll()
                                                .requestMatchers("/api/admin/**").hasAuthority("ADMIN") // Role check
                                                .anyRequest().authenticated())
                                .oauth2ResourceServer(oauth2 -> oauth2
                                                .jwt(jwt -> jwt.jwtAuthenticationConverter(
                                                                jwtAuthenticationConverter())));

                return http.build();
        }

        @Bean
        public org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter jwtAuthenticationConverter() {
                org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter();
                grantedAuthoritiesConverter.setAuthorityPrefix(""); // Don't add ROLE_ prefix
                grantedAuthoritiesConverter.setAuthoritiesClaimName("role"); // Use 'role' claim

                org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter jwtAuthenticationConverter = new org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter();
                jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
                return jwtAuthenticationConverter;
        }

        @org.springframework.beans.factory.annotation.Value("${app.jwt.secret}")
        private String jwtSecret;

        @Bean
        public org.springframework.security.oauth2.jwt.JwtDecoder jwtDecoder() {
                javax.crypto.SecretKey key = new javax.crypto.spec.SecretKeySpec(jwtSecret.getBytes(), "HmacSHA256");
                return org.springframework.security.oauth2.jwt.NimbusJwtDecoder.withSecretKey(key).build();
        }
}
