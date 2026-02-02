package com.shopverse.paymentService.controller;

import com.shopverse.paymentService.dto.PaymentRequest;
import com.shopverse.paymentService.service.PaymentServiceImpl;
import com.stripe.model.checkout.Session;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin("*")
public class PaymentController {

	private final PaymentServiceImpl paymentService;

	public PaymentController(PaymentServiceImpl paymentService) {
		this.paymentService = paymentService;
	}

	@PostMapping("/create-checkout-session")
	public Map<String, String> createSession(@RequestBody PaymentRequest request) throws Exception {
		Session session = paymentService.createCheckoutSession(request);
		return Map.of("checkoutUrl", session.getUrl());
	}

	@GetMapping("/success")
	public String success() {
		return "Payment Successful";
	}

	@GetMapping("/cancel")
	public String cancel() {
		return "Payment Cancelled";
	}
}
