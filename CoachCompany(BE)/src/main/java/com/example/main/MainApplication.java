package com.example.main;

import com.example.main.Service.UserService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class MainApplication {
	public static void main(String[] args) {
		ApplicationContext applicationContext = SpringApplication.run(MainApplication.class, args);
		UserService userService = applicationContext.getBean(UserService.class);
		userService.encodeOldPassword();
	}
}
