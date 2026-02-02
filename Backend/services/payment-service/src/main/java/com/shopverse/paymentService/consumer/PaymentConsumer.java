package com.shopverse.paymentService.consumer;

import com.shopverse.paymentService.dto.OrderEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class PaymentConsumer {

    @KafkaListener(topics = "order-topic-service", groupId = "payment-group")
    public void consume(OrderEvent event) {
        log.info("💳 Payment Service received Order Event for Order ID: {}", event.getOrderId());
        log.info("   Amount: {}", event.getAmount());
        log.info("   Status: {}", event.getStatus());

        // TODO: Process payment logic here
        processPayment(event);
    }

    private void processPayment(OrderEvent event) {
        // Placeholder for payment processing logic
        log.info("Processing payment for order {}...", event.getOrderId());
    }
}
