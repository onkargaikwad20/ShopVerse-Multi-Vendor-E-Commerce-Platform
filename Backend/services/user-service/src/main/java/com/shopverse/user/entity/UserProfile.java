package com.shopverse.user.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_profile")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Comes from Auth Service
    @Column(nullable = false, unique = true)
    private Long userId;

    private String name;
    private String email;
    private String address;

    @Column(nullable = false)
    private String role; // USER / SELLER / ADMIN
}
