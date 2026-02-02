package com.shopverse.paymentService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PaymentServiceApplication {

	@org.springframework.beans.factory.annotation.Value("${stripe.secret-key}")
	private String stripeApiKey;

	@jakarta.annotation.PostConstruct
	public void init() {
		com.stripe.Stripe.apiKey = stripeApiKey;
	}

	public static void main(String[] args) {
		SpringApplication.run(PaymentServiceApplication.class, args);
	}

}
