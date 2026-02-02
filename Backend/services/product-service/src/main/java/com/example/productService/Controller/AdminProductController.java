package com.example.productService.Controller;

import com.example.productService.Entity.Product;
import com.example.productService.Entity.VerificationStatus;
import com.example.productService.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/products/admin")
@RequiredArgsConstructor
public class AdminProductController {

    private final ProductService productService;

    @GetMapping("/pending")
    public List<Product> getPendingProducts(@RequestHeader("X-User-Role") String role) {
        if (!"ADMIN".equals(role))
            throw new RuntimeException("Access Denied");
        return productService.getPendingProducts();
    }

    @PutMapping("/{id}/verify")
    public Product verifyProduct(
            @PathVariable("id") Long id,
            @RequestBody Map<String, String> body,
            @RequestHeader("X-User-Role") String role) {
        if (!"ADMIN".equals(role))
            throw new RuntimeException("Access Denied");

        String statusStr = body.get("status");
        if (statusStr == null)
            throw new IllegalArgumentException("Status required");

        VerificationStatus status = VerificationStatus.valueOf(statusStr.toUpperCase());

        return productService.verifyProduct(id, status);
    }
}
