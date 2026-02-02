package com.shopverse.seller.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EarningsResponse {

    private BigDecimal totalEarnings;
    private BigDecimal availableBalance;
    private BigDecimal pendingBalance;
}
