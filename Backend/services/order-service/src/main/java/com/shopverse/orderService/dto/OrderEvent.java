package com.shopverse.orderService.dto;

import lombok.*;



public class OrderEvent {

    private Long orderId;
    private String status;
    private Double amount;
    private String email;
    private String productName;

    public OrderEvent() {
    }

    public OrderEvent(Long orderId, String status, Double amount,
                      String email, String productName) {
        this.orderId = orderId;
        this.status = status;
        this.amount = amount;
        this.email = email;
        this.productName = productName;
    }

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

   
}
