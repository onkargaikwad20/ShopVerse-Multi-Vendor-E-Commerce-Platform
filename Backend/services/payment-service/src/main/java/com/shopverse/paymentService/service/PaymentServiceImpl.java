package com.shopverse.paymentService.service;

import com.shopverse.paymentService.dto.PaymentRequest;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl {

        public Session createCheckoutSession(PaymentRequest request) throws Exception {

                SessionCreateParams params = SessionCreateParams.builder()
                                .setMode(SessionCreateParams.Mode.PAYMENT)

                                // 🔁 Redirect URLs (Frontend)
                                .setSuccessUrl("http://localhost:5173/payment/success")
                                .setCancelUrl("http://localhost:5173/payment/cancel")

                                // 💳 Payment method
                                .addPaymentMethodType(
                                                SessionCreateParams.PaymentMethodType.CARD)

                                // 🧾 Line item
                                .addLineItem(
                                                SessionCreateParams.LineItem.builder()
                                                                .setQuantity(1L)
                                                                .setPriceData(
                                                                                SessionCreateParams.LineItem.PriceData
                                                                                                .builder()
                                                                                                .setCurrency("inr")
                                                                                                .setUnitAmount(request
                                                                                                                .getAmount()) // in
                                                                                                                              // paise
                                                                                                .setProductData(
                                                                                                                SessionCreateParams.LineItem.PriceData.ProductData
                                                                                                                                .builder()
                                                                                                                                .setName(request.getProductName())
                                                                                                                                .build())
                                                                                                .build())
                                                                .build())

                                // ⭐⭐⭐ THIS IS THE IMPORTANT PART ⭐⭐⭐
                                // Metadata used later in Stripe Webhook
                                .putMetadata(
                                                "orderId",
                                                request.getOrderId().toString())

                                .build();

                return Session.create(params);
        }
}
