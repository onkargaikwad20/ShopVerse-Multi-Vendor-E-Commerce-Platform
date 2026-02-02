package com.shopverse.orderService.service;


import com.shopverse.orderService.entity.Order;



import java.util.List;

public interface OrderService {

    Order createOrder(Long userId, String productName, Integer quantity, Double totalAmount, String email, List<com.shopverse.orderService.dto.OrderItemDto> items);

    Order getOrderById(Long id);

    List<Order> getAllOrders();

    Order cancelOrder(Long id);

    String initiatePayment(Long orderId, String email, String token);

    List<Order> getOrdersByUserId(Long userId);

    void updateOrderStatus(Long orderId, String status);
}
