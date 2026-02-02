package com.shopverse.orderService.dto;



import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class OrderRequestDto {

    @NotNull
    private Long userId;

    @NotBlank
    private String productName;  

    @NotNull
    @Min(1)
    private Integer quantity;  
    
    @NotNull
    private Double totalAmount;

    @com.fasterxml.jackson.annotation.JsonProperty("items")
    private java.util.List<OrderItemDto> items;
}

