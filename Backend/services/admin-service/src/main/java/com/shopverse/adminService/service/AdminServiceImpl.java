package com.shopverse.adminService.service;

import com.shopverse.adminService.dto.SellerDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final RestTemplate restTemplate;

    private static final String USER_SERVICE_URL =
            "http://localhost:8081/api/user";

    private static final String SELLER_SERVICE_URL =
            "http://localhost:8083/api/seller";

    private static final String ORDER_SERVICE_URL =
            "http://localhost:8085/api/order"; // future

    @Override
    public Object getAllUsers(String authorizationHeader) {

        String authServiceUrl = "http://localhost:8081/api/user";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", authorizationHeader);

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<Object> response =
                restTemplate.exchange(
                        authServiceUrl,
                        HttpMethod.GET,
                        entity,
                        Object.class
                );

        return response.getBody();
    }

    @Override
    public List<SellerDto> getAllSellers() {
        SellerDto[] sellers =
                restTemplate.getForObject(SELLER_SERVICE_URL, SellerDto[].class);
        return Arrays.asList(sellers);
    }

    @Override
    public void blockUser(Long userId) {
        restTemplate.put(
                USER_SERVICE_URL + "/" + userId + "/block",
                null
        );
    }

    @Override
    public Object blockSeller(Long sellerId) {
        return restTemplate.exchange(
                SELLER_SERVICE_URL + "/" + sellerId + "/block",
                HttpMethod.PUT,
                null,
                Object.class
        ).getBody();
    }

    @Override
    public Object getAllOrders() {
        return restTemplate.getForObject(ORDER_SERVICE_URL, Object.class);
    }
}
