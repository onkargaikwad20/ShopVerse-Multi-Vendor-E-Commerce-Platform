package com.example.notificationservice.consumer;

import com.example.notificationservice.service.NotificationService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationConsumer {

    private final NotificationService notificationService;
    private final com.fasterxml.jackson.databind.ObjectMapper objectMapper = new com.fasterxml.jackson.databind.ObjectMapper();

    public NotificationConsumer(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @KafkaListener(topics = "notification-topic", groupId = "notification-group")
    public void consume(String message) {
        // Log received message
        System.out.println("📩 RAW EVENT from Kafka: " + message);

        try {
            com.example.notificationservice.dto.NotificationEvent event = objectMapper.readValue(message,
                    com.example.notificationservice.dto.NotificationEvent.class);

            // Send notification
            notificationService.sendNotification(event);
        } catch (Exception e) {
            System.err.println("❌ Error parsing notification event: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
