package com.example.main.Controller;

import com.example.main.DTO.LoginRequest;
import com.example.main.Entity.User;
import com.example.main.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers(){
        List<User> users = userService.getUsers();
        return new ResponseEntity<>(users,HttpStatus.ACCEPTED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> getEmployeeById(@RequestBody LoginRequest loginRequest){
        User userIsLogined = userService.handleLogin(loginRequest.getEmail(),loginRequest.getPassword());
        return new ResponseEntity<>(userIsLogined, HttpStatus.ACCEPTED);
    }
}
