package com.shopverse.orderService.service;

import com.shopverse.orderService.entity.Order;
import com.shopverse.orderService.repository.OrderRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    // private final PaymentServiceClient paymentServiceClient;

    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public Order createOrder(Long userId, String productName, Integer quantity, Double amount, String email,
            List<com.shopverse.orderService.dto.OrderItemDto> itemDtos) {

        Order order = Order.builder()
                .userId(userId)
                .productName(productName)
                .quantity(quantity)
                .totalAmount(amount)
                .email(email)
                .status("CREATED")
                .build();

        if (itemDtos != null && !itemDtos.isEmpty()) {
            List<com.shopverse.orderService.entity.OrderItem> items = itemDtos.stream()
                    .map(dto -> {
                        // Call Product Service to reduce stock
                        try {
                            restTemplate.put(
                                    "http://localhost:9000/api/product/" + dto.getProductId()
                                            + "/reduce-stock?quantity=" + dto.getQuantity(),
                                    null);
                        } catch (Exception e) {
                            e.printStackTrace();
                            throw new RuntimeException("Failed to reduce stock for product: " + dto.getProductId()
                                    + " Reason: " + e.getMessage(), e);
                        }

                        return com.shopverse.orderService.entity.OrderItem.builder()
                                .productId(dto.getProductId())
                                .productName(dto.getProductName())
                                .quantity(dto.getQuantity())
                                .price(dto.getPrice())
                                .order(order)
                                .build();
                    })
                    .collect(java.util.stream.Collectors.toList());
            order.setItems(items);
        }

        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long orderId) {

        Order order = getOrderById(orderId);
        order.setStatus("CANCELLED");
        return orderRepository.save(order);
    }

    @Override
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // ❌ CANCELLED orders NOT returned
    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findByStatusNotOrderByIdAsc("CANCELLED");
    }

    @Override
    public String initiatePayment(Long orderId, String email, String token) {

        Order order = getOrderById(orderId);

        Long amountInCents = (long) (order.getTotalAmount() * 100);

        Map<String, Object> request = new HashMap<>();
        request.put("orderId", order.getId());
        request.put("amount", amountInCents);
        request.put("productName", order.getProductName());
        request.put("email", email);

        org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
        headers.set("Authorization", token);
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);

        org.springframework.http.HttpEntity<Map<String, Object>> entity = new org.springframework.http.HttpEntity<>(
                request, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "http://localhost:8080/payment-service/api/payment/create-checkout-session",
                entity,
                Map.class);

        return response.getBody().get("checkoutUrl").toString();

    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public void updateOrderStatus(Long orderId, String status) {
        Order order = getOrderById(orderId);
        order.setStatus(status);
        orderRepository.save(order);
    }

}
