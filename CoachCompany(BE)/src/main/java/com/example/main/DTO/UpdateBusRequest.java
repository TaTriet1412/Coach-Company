package com.example.main.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateBusRequest {
    private String number_bus;
    private boolean enable;
}
