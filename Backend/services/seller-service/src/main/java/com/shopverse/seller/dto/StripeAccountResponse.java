package com.shopverse.seller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StripeAccountResponse {
    private String stripeAccountId;
    private String message;
}
