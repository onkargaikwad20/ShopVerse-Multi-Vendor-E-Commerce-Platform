package com.shopverse.orderService.dto;


public class NotificationEvent {

    private String type;
    private String email;
    private String message;

    public NotificationEvent() {
    }

    public NotificationEvent(String type, String email, String message) {
        this.type = type;
        this.email = email;
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
