package com.shopverse.orderService.controller;

import com.shopverse.orderService.dto.NotificationEvent;
import com.shopverse.orderService.dto.OrderEvent;
import com.shopverse.orderService.dto.OrderRequestDto;
import com.shopverse.orderService.entity.Order;
import com.shopverse.orderService.service.OrderProducer;
import com.shopverse.orderService.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderProducer producer;

    @PostMapping
    public ResponseEntity<Map<String, String>> createOrder(
            @org.springframework.web.bind.annotation.RequestHeader("Authorization") String token,
            @RequestBody OrderRequestDto request,
            @RequestParam String email) {


        if (email == null || email.trim().isEmpty() || "undefined".equalsIgnoreCase(email)) {
            System.out.println("⚠️ WARNING: Received 'undefined' email. Using fallback.");
            email = "guest@shopverse.com"; // Fallback to prevent crash
        }

        Order order = orderService.createOrder(
                request.getUserId(),
                request.getProductName(),
                request.getQuantity(),
                request.getTotalAmount(),
                email,
                request.getItems());

        if (request.getItems() == null || request.getItems().isEmpty()) {
            System.out.println("⚠️ WARNING: Received Order Request with NO ITEMS!");
        } else {
            System.out.println("✅ Received Order Request with " + request.getItems().size() + " items.");
            request.getItems().forEach(i -> System.out.println(
                    "   - Item: " + i.getProductName() + ", Qty: " + i.getQuantity() + ", ID: " + i.getProductId()));
        }


        OrderEvent orderEvent = new OrderEvent(
                order.getId(),
                order.getStatus(),
                order.getTotalAmount(),
                email,
                order.getProductName());

        producer.sendOrder(orderEvent);


        NotificationEvent notificationEvent = new NotificationEvent(
                "ORDER_CREATED",
                email,
                "Your order #" + order.getId() + " has been successfully placed!");
        producer.sendNotification(notificationEvent);


        String checkoutUrl = orderService.initiatePayment(order.getId(), email, token);

        return ResponseEntity.ok(Map.of("checkoutUrl", checkoutUrl));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable Long id) {

        Order order = orderService.cancelOrder(id);


        NotificationEvent notificationEvent = new NotificationEvent(
                "ORDER_CANCELLED",
                "user@email.com", // fetch from order/user service
                "Your order has been cancelled");
        producer.sendNotification(notificationEvent);

        return ResponseEntity.ok(order);
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<?> initiatePayment(
            @org.springframework.web.bind.annotation.RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestParam String email) {

        String checkoutUrl = orderService.initiatePayment(id, email, token);


        NotificationEvent notificationEvent = new NotificationEvent(
                "PAYMENT_INITIATED",
                email,
                "Payment initiated for order ID " + id);
        producer.sendNotification(notificationEvent);

        return ResponseEntity.ok(Map.of("checkoutUrl", checkoutUrl));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId));
    }

    @PutMapping("/{id}/paid")
    public ResponseEntity<Void> markOrderAsPaid(@PathVariable Long id) {
        orderService.updateOrderStatus(id, "PAID");
        return ResponseEntity.ok().build();
    }
}
