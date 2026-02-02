package com.shopverse.orderService.controller;

import com.shopverse.orderService.dto.CartDto;
import com.shopverse.orderService.dto.CartItemDto;
import com.shopverse.orderService.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<CartDto> getCart(@RequestHeader("X-User-Id") Long userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<CartDto> addToCart(
            @RequestHeader("X-User-Id") Long userId,
            @RequestBody CartItemDto itemDto) {
        return ResponseEntity.ok(cartService.addToCart(userId, itemDto));
    }

    @DeleteMapping("/remove/{itemId}")
    public ResponseEntity<CartDto> removeFromCart(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long itemId) {
        return ResponseEntity.ok(cartService.removeFromCart(userId, itemId));
    }

    @PutMapping("/update/{itemId}")
    public ResponseEntity<CartDto> updateQuantity(
            @RequestHeader("X-User-Id") Long userId,
            @PathVariable Long itemId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(cartService.updateQuantity(userId, itemId, quantity));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestHeader("X-User-Id") Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
}
