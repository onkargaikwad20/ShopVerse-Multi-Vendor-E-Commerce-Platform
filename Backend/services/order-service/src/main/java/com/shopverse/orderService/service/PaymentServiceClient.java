package com.shopverse.orderService.service;


import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class PaymentServiceClient {

//    private final RestTemplate restTemplate = new RestTemplate();
//
//    private static final String PAYMENT_SERVICE_URL =
//            "http://localhost:8082/payments/stripe/create-checkout";
//
//    public String createCheckout(Long orderId, Double amount, String email) {
//
//        Map<String, Object> request = Map.of(
//                "orderId", orderId,
//                "amount", amount,
//                "currency", "inr",
//                "email", email
//        );
//
//        Map response = restTemplate.postForObject(
//                PAYMENT_SERVICE_URL,
//                request,
//                Map.class
//        );
//
//        return response.get("checkoutUrl").toString();
//    }
}
