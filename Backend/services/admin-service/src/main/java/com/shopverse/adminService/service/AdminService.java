package com.shopverse.adminService.service;

import com.shopverse.adminService.dto.SellerDto;

import java.util.List;

public interface AdminService {

    Object getAllUsers(String authorizationHeader);

    List<SellerDto> getAllSellers();

    void blockUser(Long userId);

    Object blockSeller(Long sellerId);

    Object getAllOrders(); // future
}
