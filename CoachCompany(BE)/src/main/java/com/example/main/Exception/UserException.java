package com.example.main.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class UserException extends RuntimeException {
    public UserException(){}

    public UserException(String msgErr){
        super(msgErr);
    }
}
