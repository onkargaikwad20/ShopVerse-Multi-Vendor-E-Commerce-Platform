package com.shopverse.paymentService.controller;

import com.shopverse.paymentService.service.WebhookService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@RequestMapping("/webhook")
@RequiredArgsConstructor
public class WebhookController {

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    private final WebhookService webhookService;

    @PostMapping
    public String handleWebhook(HttpServletRequest request)
            throws Exception {

        String payload = request.getReader()
                .lines()
                .collect(Collectors.joining("\n"));

        String sigHeader = request.getHeader("Stripe-Signature");

        Event event;

        try {
            event = Webhook.constructEvent(
                    payload,
                    sigHeader,
                    webhookSecret);
        } catch (SignatureVerificationException e) {
            throw new RuntimeException("Invalid signature");
        }

        webhookService.process(event);
        return "OK";
    }
}
