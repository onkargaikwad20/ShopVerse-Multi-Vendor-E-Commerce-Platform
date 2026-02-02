package com.shopverse.orderService.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shopverse.orderService.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByStatusNotOrderByIdAsc(String status);
	
	Optional<Order> findByIdAndStatusNot(Long id, String status);

    List<Order> findByUserId(Long userId);
}



