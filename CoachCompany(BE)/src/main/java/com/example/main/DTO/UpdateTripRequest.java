package com.example.main.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTripRequest {
    private Long bus_id;
    private Long driver_id;
    private Long codriver_id;
    private String date_time_start;
    private Integer duration;
    private boolean enable;
}
