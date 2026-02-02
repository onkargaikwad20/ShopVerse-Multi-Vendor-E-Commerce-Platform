package com.shopverse.seller.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "shop_id")
    @lombok.ToString.Exclude
    @lombok.EqualsAndHashCode.Exclude
    private Shop shop;
}
