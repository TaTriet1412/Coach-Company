package com.example.main.Controller;

import com.example.main.DTO.LoginRequest;
import com.example.main.Entity.User;
import com.example.main.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @GetMapping("{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId){
        User user = userService.getUserById(userId);
        return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> getEmployeeById(@RequestBody LoginRequest loginRequest){
        User userIsLogined = userService.handleLogin(loginRequest.getEmail(),loginRequest.getPassword());
        return new ResponseEntity<>(userIsLogined, HttpStatus.ACCEPTED);
    }

    @PostMapping("/send-verification-code")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String,String> infoCodeAndEmail){
        String email = infoCodeAndEmail.get("email");
        if(!userService.sendVerificationCode(email)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<Object> verifiesCode(@RequestBody Map<String,String> infoCodeAndEmail){
        String email = infoCodeAndEmail.get("email");
        String code = infoCodeAndEmail.get("code");
        if (userService.verifyCode(email,code)){
            return new ResponseEntity<>(HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestBody Map<String,String> passwordRequest){
        String password = passwordRequest.get("password");
        String email = passwordRequest.get("email");
        User user = userService.updatePassword(email,password);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
