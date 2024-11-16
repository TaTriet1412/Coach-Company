package com.example.main.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserRequest {
    private String name;
    private String email;
    private String phone;
    private String birthday;
    private boolean gender;
    private Integer role;
}
