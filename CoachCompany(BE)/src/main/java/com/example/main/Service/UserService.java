package com.example.main.Service;

import com.example.main.Entity.User;
import com.example.main.Exception.UserException;
import com.example.main.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender javaMailSender;
//    Store Code after generate
    private final Map<String, String> verificationCodes = new HashMap<>();

    public User handleLogin(String email,String password) throws UserException {
        for (User user:this.getUsers()){
            if(user.getEmail().equals(email) && user.getPassword().equals(password)){
                return user;
            }
        }
        throw new UserException("Email hoặc password bị sai!");
    }

    public List<User> getUsers(){
        return this.userRepository.findAll();
    }

//    Send code to email
    public boolean sendVerificationCode(String email) {
        if(getUserByEmail(email) == null){
            return false;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        String codeVerify = generateRandomCode();
        verificationCodes.put(email, codeVerify);
        message.setFrom("tatriet_tony@1zulieu.com");
        message.setTo(email);
        message.setSubject("Mã xác thực");
        message.setText("Mã xác thực của bạn là: " + codeVerify);
        javaMailSender.send(message);
        return true;
    }

    public boolean verifyCode(String email, String code) {
        String storedCode = verificationCodes.get(email);
        return storedCode != null && storedCode.equals(code);
    }

    private String generateRandomCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }

    public User updatePassword(String email,String password){
        User user = getUserByEmail(email);
        user.setPassword(password);
        return userRepository.save(user);
    }

    public User getUserById(String id) {
        return userRepository.findById(Long.valueOf(id)).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        List<User> userList = getUsers();
        for (User user:userList){
            if(user.getEmail().equals(email)){
                return user;
            }
        }
        return null;
    }
}
