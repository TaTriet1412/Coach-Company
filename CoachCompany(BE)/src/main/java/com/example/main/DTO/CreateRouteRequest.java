package com.example.main.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateRouteRequest {
    private String start_point;
    private String rest_point;
    private String end_point;
    private Integer duration;
    private Integer distance;
    private Integer price;
}
