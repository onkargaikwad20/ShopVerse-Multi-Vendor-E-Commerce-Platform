package com.example.productService.Dto;
import lombok.Data; 
import jakarta.validation.constraints.*; 
@Data 
public class ProductDto 
{ 
	private Long id; 
	@NotBlank private String name; 
	private String description; 
	@NotNull 
	@DecimalMin("0.0") 
	private Double price; 
	@NotNull 
	@Min(0) 
	private Integer quantity; 
	private String images; 
	private Long sellerId;
	private Long shopId; 
	@NotBlank
	private String category; 
	}