package com.shopverse.gateway.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI gatewayOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("ShopVerse API Gateway")
                        .description("Unified entry point for all ShopVerse microservices")
                        .version("1.0.0"));
    }
}
