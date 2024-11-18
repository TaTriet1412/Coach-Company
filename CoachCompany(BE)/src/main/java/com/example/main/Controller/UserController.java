package com.example.main.Controller;

import com.example.main.DTO.*;
import com.example.main.Entity.Route;
import com.example.main.Entity.User;
import com.example.main.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers(@RequestHeader Map<String,String> header){
        List<User> users = userService.getUsers();
        return new ResponseEntity<>(users,HttpStatus.ACCEPTED);
    }

    @GetMapping("{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId,@RequestHeader Map<String,String> header){
        User user = userService.getUserById(userId);
        return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
    }

    @PostMapping("/login")
    public ResponseEntity<User> getEmployeeById(@RequestBody LoginRequest loginRequest,@RequestHeader Map<String,String> header){
        User userIsLogined = userService.handleLogin(loginRequest.getEmail(),loginRequest.getPassword());
        return new ResponseEntity<>(userIsLogined, HttpStatus.ACCEPTED);
    }

    @PostMapping("/send-verification-code")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String,String> infoCodeAndEmail,@RequestHeader Map<String,String> header){
        String email = infoCodeAndEmail.get("email");
        if(!userService.sendVerificationCode(email)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/verify-code")
    public ResponseEntity<Object> verifiesCode(@RequestBody Map<String,String> infoCodeAndEmail,@RequestHeader Map<String,String> header){
        String email = infoCodeAndEmail.get("email");
        String code = infoCodeAndEmail.get("code");
        if (userService.verifyCode(email,code)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PutMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestBody Map<String,String> passwordRequest,@RequestHeader Map<String,String> header){
        String password = passwordRequest.get("password");
        String email = passwordRequest.get("email");
        User user = userService.updatePassword(email,password);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    Lấy nhân viên bán vé
    @GetMapping("/staff")
    public ResponseEntity<List<User>> getStaffs(@RequestHeader Map<String,String> header){
//        Them exception
        List<User> staffList = userService.getStaffs();
        return new ResponseEntity<>(staffList,HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> removeRoute(@PathVariable Long id, @RequestHeader Map<String,String> header){
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping
    public ResponseEntity<User> addUser(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String birthday,
            @RequestParam boolean gender,
            @RequestParam Integer role,
            @RequestPart(required = false) MultipartFile img,
            @RequestHeader Map<String,String> header) throws IOException {
        User user = userService.addUser(name,email,phone,birthday,gender,role,img);
        return new ResponseEntity<>(user,HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String birthday,
            @RequestParam boolean gender,
            @RequestParam boolean enable,
            @RequestPart(required = false) MultipartFile img,
            @RequestHeader Map<String,String> header) throws IOException {
        User user = userService.updateUser(id,name,email,phone,birthday,gender,enable,img);
        return new ResponseEntity<>(user,HttpStatus.ACCEPTED);
    }


}
