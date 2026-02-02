package com.shopverse.auth.service;

public interface SmsSender {
    void sendSms(String phone, String message);
}
