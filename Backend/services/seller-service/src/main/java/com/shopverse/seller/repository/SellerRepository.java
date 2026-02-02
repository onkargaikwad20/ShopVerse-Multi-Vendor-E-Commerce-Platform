package com.shopverse.seller.repository;

import com.shopverse.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SellerRepository extends JpaRepository<Seller, Long> {

    boolean existsByUserId(Long userId);

    Optional<Seller> findByUserId(Long userId);

    Optional<Seller> findByStripeAccountId(String stripeAccountId);

    java.util.List<com.shopverse.seller.entity.Seller> findByKycStatus(
            com.shopverse.seller.entity.VerificationStatus status);
}
