package com.shopverse.seller.dto;

import lombok.Data;

@Data
public class OnboardingLinkResponse {
    private String url;
    private Long expiresAt;
}
