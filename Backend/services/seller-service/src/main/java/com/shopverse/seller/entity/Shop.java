package com.shopverse.seller.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "seller_id", nullable = false)
    @JsonIgnore
    private Seller seller;

    private String shopName;

    private String description;

    private String address;

    private String shopBannerUrl;

    @OneToMany(mappedBy = "shop", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Set<Category> categories = new HashSet<>();

    private Instant createdAt = Instant.now();
}
