package com.shopverse.paymentService.service;

import com.shopverse.paymentService.dto.PaymentRequest;

public interface PaymentService {
    String createCheckoutSession(PaymentRequest request);
}
