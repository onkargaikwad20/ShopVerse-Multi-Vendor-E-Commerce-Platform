package com.shopverse.seller.repository;

import com.shopverse.seller.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ShopRepository extends JpaRepository<Shop, Long> {

    Optional<Shop> findBySellerId(Long sellerId);

    boolean existsBySellerId(Long sellerId);
}
