package com.shopverse.paymentService.service;

import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class WebhookServiceImpl implements WebhookService {

    private final RestTemplate restTemplate;

    @Override
    public void process(Event event) {

        if ("checkout.session.completed".equals(event.getType())) {

            Session session = (Session) event.getDataObjectDeserializer()
                    .getObject()
                    .orElseThrow();

            Long orderId = Long.valueOf(
                    session.getMetadata().get("orderId"));

            // Call Order Service to mark PAID
            restTemplate.put(
                    "http://localhost:8080/order-service/api/orders/" + orderId + "/paid",
                    null);
        }
    }
}
