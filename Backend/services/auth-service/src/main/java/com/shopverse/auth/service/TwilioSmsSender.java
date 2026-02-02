package com.shopverse.auth.service;

import org.springframework.stereotype.Service;

@Service
public class TwilioSmsSender implements SmsSender {

    @Override
    public void sendSms(String phone, String message) {
        // REAL SMS later (Twilio)
        System.out.println("Sending SMS to " + phone + " : " + message);
    }
}
