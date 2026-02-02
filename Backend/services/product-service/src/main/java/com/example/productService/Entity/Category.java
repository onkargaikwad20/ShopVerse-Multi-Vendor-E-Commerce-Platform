package com.example.productService.Entity;
import jakarta.persistence.*; 

import lombok.*;
@Entity
@Table(name = "categories") 
@Data 
@NoArgsConstructor
@AllArgsConstructor 
@Builder
public class Category {
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(unique=true, nullable=false)
	private String name; 
	private String description;
	}