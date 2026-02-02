package com.shopverse.seller.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false, unique = true)
    private Long userId;

    private String name;
    private String email;
    private String phone;

    @Enumerated(EnumType.STRING)
    private VerificationStatus kycStatus;

    private String address;
    private String businessDetails;

    private Instant createdAt;
    private Instant updatedAt;

    private String stripeAccountId;
}
