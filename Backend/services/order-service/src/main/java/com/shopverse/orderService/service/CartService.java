package com.shopverse.orderService.service;

import com.shopverse.orderService.dto.CartDto;
import com.shopverse.orderService.dto.CartItemDto;
import com.shopverse.orderService.entity.Cart;
import com.shopverse.orderService.entity.CartItem;
import com.shopverse.orderService.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    public CartDto getCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElse(Cart.builder().userId(userId).build());

        return mapToDto(cart);
    }

    @Transactional
    public CartDto addToCart(Long userId, CartItemDto itemDto) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElse(Cart.builder().userId(userId).build());

        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(itemDto.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + itemDto.getQuantity());
        } else {
            CartItem newItem = CartItem.builder()
                    .productId(itemDto.getProductId())
                    .productName(itemDto.getProductName())
                    .quantity(itemDto.getQuantity())
                    .price(itemDto.getPrice())
                    .imageUrl(itemDto.getImageUrl())
                    .build();
            cart.addItem(newItem);
        }

        Cart savedCart = cartRepository.save(cart);
        return mapToDto(savedCart);
    }

    @Transactional
    public CartDto removeFromCart(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().removeIf(item -> item.getId().equals(cartItemId));
        
        Cart savedCart = cartRepository.save(cart);
        return mapToDto(savedCart);
    }
    
    @Transactional
    public CartDto updateQuantity(Long userId, Long cartItemId, Integer quantity) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));

        Cart savedCart = cartRepository.save(cart);
        return mapToDto(savedCart);
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId).orElse(null);
        if (cart != null) {
            cart.getItems().clear();
            cartRepository.save(cart);
        }
    }

    private CartDto mapToDto(Cart cart) {
        double total = cart.getItems().stream()
                .mapToDouble(item -> item.getPrice() * item.getQuantity())
                .sum();

        return CartDto.builder()
                .id(cart.getId())
                .userId(cart.getUserId())
                .items(cart.getItems().stream()
                        .map(this::mapItemToDto)
                        .collect(Collectors.toList()))
                .totalAmount(total)
                .build();
    }

    private CartItemDto mapItemToDto(CartItem item) {
        return CartItemDto.builder()
                .id(item.getId())
                .productId(item.getProductId())
                .productName(item.getProductName())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .imageUrl(item.getImageUrl())
                .build();
    }
}
