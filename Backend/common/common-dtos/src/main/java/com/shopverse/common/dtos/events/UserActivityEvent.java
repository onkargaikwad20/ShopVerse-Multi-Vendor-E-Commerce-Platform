package com.shopverse.common.dtos.events;

import lombok.Data;

@Data
public class UserActivityEvent {
    private Long userId;
    private String activityType; // VIEW_PRODUCT, ADD_TO_CART, SEARCH, etc.
    private String productId;
    private long timestamp;
}
