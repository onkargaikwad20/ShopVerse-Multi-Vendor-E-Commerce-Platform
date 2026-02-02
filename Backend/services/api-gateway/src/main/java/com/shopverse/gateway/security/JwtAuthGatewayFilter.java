package com.shopverse.gateway.security;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthGatewayFilter implements GlobalFilter, Ordered {

    private final JwtUtil jwtUtil;
    private final StringRedisTemplate redisTemplate;

    public JwtAuthGatewayFilter(JwtUtil jwtUtil,
                                StringRedisTemplate redisTemplate) {
        this.jwtUtil = jwtUtil;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();

        // ALLOW ALL SWAGGER PATHS (NO JWT)
        if (path.startsWith("/webjars/")
                || path.startsWith("/v3/api-docs")
                || path.contains("/v3/api-docs")
                || path.contains("/swagger-ui")) {
            return chain.filter(exchange);
        }

        // 2. ALLOW AUTH APIs
        if (path.startsWith("/auth-service/api/auth")) {
            return chain.filter(exchange);
        }

        // 🔐 3. JWT REQUIRED FOR EVERYTHING ELSE
        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.validateToken(token)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        ServerHttpRequest mutatedRequest = exchange.getRequest()
                .mutate()
                .header("X-User-Id", String.valueOf(jwtUtil.extractUserId(token)))
                .header("X-User-Role", jwtUtil.extractRole(token))
                .build();

        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
