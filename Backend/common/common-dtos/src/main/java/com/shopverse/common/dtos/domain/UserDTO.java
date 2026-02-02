package com.shopverse.common.dtos.domain;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
}
