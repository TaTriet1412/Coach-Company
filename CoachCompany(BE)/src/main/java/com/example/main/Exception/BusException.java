package com.example.main.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class BusException extends RuntimeException {
    public BusException(String message) {
        super(message);
    }
}
