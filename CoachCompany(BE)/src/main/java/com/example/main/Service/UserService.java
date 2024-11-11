package com.example.main.Service;

import com.example.main.Entity.User;
import com.example.main.Exception.UserException;
import com.example.main.Exception.VerifyException;
import com.example.main.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JavaMailSender javaMailSender;
//    Store Code after generate
    private final Map<String, String> verificationCodes = new HashMap<>();

//    Đếm ngược thời gian
    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    //    Công cụ mã hóa mật khẩu
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserService(){
    }

    public User handleLogin(String email,String password) throws UserException {
        for (User user:this.getUsers()){
            if(user.getEmail().equals(email) && encoder.matches(password,user.getPassword())){
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
//        Demo nếu cần
//        scheduler.schedule(() -> verificationCodes.remove(email), 3, TimeUnit.SECONDS);

//        Chỉnh thời gian 5 phút
        scheduler.schedule(() -> verificationCodes.remove(email), 5, TimeUnit.MINUTES);

        message.setFrom("tatriet_tony@1zulieu.com");
        message.setTo(email);
        message.setSubject("Mã xác thực");
        message.setText("Mã xác thực của bạn là: " + codeVerify);
        javaMailSender.send(message);
        return true;
    }

    public boolean verifyCode(String email, String code) {
        String storedCode = verificationCodes.get(email);
        if(storedCode == null){
            throw new VerifyException("Mã đã hết hạn");
        }else if(!storedCode.equals(code)) {
            throw new VerifyException("Mã xác thực không khớp");
        }
        return true;
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

//    Lấy nhân viên bán vé
    public List<User> getStaffs(){
        List<User> staffList = new LinkedList<>();
        List<User> userList = getUsers();
        for (User user:userList){
            if(user.getRole()==2){
                staffList.add(user);
            }
        }
        return staffList;
    }

//    EncodePassword
    public void encodePassword(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        userRepository.save(user);
    }

//    encodeOldPassword
    public void encodeOldPassword(){
        List<User> userList = getUsers();
        for(User user:userList){
            if (!user.getPassword().startsWith("$2a$") && !user.getPassword().startsWith("$2b$") && !user.getPassword().startsWith("$2y$")){
                encodePassword(user);
            }
        }
    }
}
