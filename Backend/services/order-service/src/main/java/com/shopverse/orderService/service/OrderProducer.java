package com.shopverse.orderService.service;

import org.jspecify.annotations.Nullable;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.shopverse.orderService.dto.NotificationEvent;
import com.shopverse.orderService.dto.OrderEvent;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderProducer {

    private final KafkaTemplate<String, OrderEvent> orderKafkaTemplate;
    private final KafkaTemplate<String, NotificationEvent> notificationKafkaTemplate;

    public void sendOrder(OrderEvent event) {
        orderKafkaTemplate.send("order-topic-service", event);
    }

    public void sendNotification(NotificationEvent event) {
        notificationKafkaTemplate.send("notification-topic", event);
    }
}



