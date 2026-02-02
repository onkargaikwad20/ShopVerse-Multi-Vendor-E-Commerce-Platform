package com.shopverse.paymentService.service;

import com.stripe.model.Event;

public interface WebhookService {
    void process(Event event);
}
