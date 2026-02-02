package com.example.productService.Dto; 
import lombok.Data; 
import jakarta.validation.constraints.NotBlank;
@Data
public class CategoryDto 
{ 
	private Long id;
	@NotBlank 
	private String name; 
	private String description; 
}