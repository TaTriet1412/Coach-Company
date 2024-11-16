package com.example.main.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateTripRequest {
    private Long bus_id;
    private Long driver_id;
    private Long codriver_id;
    private String date_time_start;
    private Integer duration;
}
