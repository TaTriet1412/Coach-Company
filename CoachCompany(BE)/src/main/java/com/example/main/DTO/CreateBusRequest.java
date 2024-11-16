package com.example.main.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateBusRequest {
    private String number_bus;
    private Long route_id;
}
