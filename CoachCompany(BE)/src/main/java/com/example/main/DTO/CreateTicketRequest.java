package com.example.main.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTicketRequest {
    private Long trip_id;
    private String name_customer;
    private String phone_customer;
    private String email_customer;
    private Long[] seat_list;
}
