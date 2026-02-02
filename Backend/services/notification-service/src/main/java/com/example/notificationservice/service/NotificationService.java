package com.example.notificationservice.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final JavaMailSender javaMailSender;

    public NotificationService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendNotification(com.example.notificationservice.dto.NotificationEvent event) {
        if (event == null)
            return;

        System.out.println("Processing event: " + event.getType() + " for: " + event.getEmail());

        // Map event types to email subjects
        String subject = "Notification from ShopVerse";
        if ("PAYMENT_INITIATED".equalsIgnoreCase(event.getType())) {
            subject = "Payment Initiated";
        } else if ("ORDER_CANCELLED".equalsIgnoreCase(event.getType())) {
            subject = "Order Cancelled";
        } else if ("ORDER_CREATED".equalsIgnoreCase(event.getType())) {
            subject = "Order Confirmed";
        }

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(event.getEmail());
        mail.setSubject(subject);
        mail.setText(event.getMessage());

        try {
            javaMailSender.send(mail);
            System.out.println("✅ Email sent successfully to: " + event.getEmail());
        } catch (Exception e) {
            System.err.println("❌ Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
