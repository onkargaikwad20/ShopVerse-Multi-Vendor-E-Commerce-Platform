package com.shopverse.gateway.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import reactor.core.publisher.Mono;

@Configuration
public class UserConfig {

    @Bean
    public ReactiveUserDetailsService reactiveUserDetailsService() {
        //Disable default Spring Security user
        return username -> Mono.empty();
    }
}
