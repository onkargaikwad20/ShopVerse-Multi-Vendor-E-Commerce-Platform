package com.example.productService.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	@Column(length = 2000)
	private String description;
	private Double price;
	private Integer quantity;
	private String images;
	private Long sellerId;
	private Long shopId;
	private String category;

	@Enumerated(EnumType.STRING)
	private VerificationStatus verificationStatus;

	private Instant createdAt;
	private Instant updatedAt;
	private Instant deletedAt;
}