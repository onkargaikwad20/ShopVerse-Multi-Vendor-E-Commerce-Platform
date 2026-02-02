package com.example.notificationservice.dto;

public class NotificationEvent {

    private String type;
    private String email;
    private String message;

    public NotificationEvent() {
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

    @Override
    public String toString() {
        return "NotificationEvent{" +
                "type='" + type + '\'' +
                ", email='" + email + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
