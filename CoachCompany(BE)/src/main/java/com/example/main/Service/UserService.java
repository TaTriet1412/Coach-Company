package com.example.main.Service;

import com.example.main.DTO.CreateRouteRequest;
import com.example.main.DTO.CreateUserRequest;
import com.example.main.DTO.UpdateRouteRequest;
import com.example.main.DTO.UpdateUserRequest;
import com.example.main.Entity.Route;
import com.example.main.Entity.User;
import com.example.main.Exception.FileException;
import com.example.main.Exception.UserException;
import com.example.main.Exception.VerifyException;
import com.example.main.FileHandle.FileChecker;
import com.example.main.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

//    File checker
    private final FileChecker fileChecker = new FileChecker();


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

    public User getUserById(Long id){
        return this.userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
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
        user.setPassword(encoder.encode(password));
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

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User addUser(
            String name,
            String email,
            String phone,
            String birthday,
            boolean gender,
            Integer role,
            MultipartFile img
    ) throws IOException {
        List<User> userList = getUsers();
        for(User user: userList){
            if(user.getEmail().equals(email)){
                throw new UserException("Email đã được đăng kí trong hệ thống");
            }else if(user.getPhone().equals(phone)){
                throw new UserException("Số điện thoại đã tồn tại trong hệ thống");
            }
        }

        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(birthday);
        User user = new User(
                name,
                email,
                phone,
                date,
                role,
                gender
        );
        user.setPassword(encoder.encode("123"));
        if (img != null) {
            if(fileChecker.isImage(img)){
                user.setImg(img.getBytes());
            }else{
                throw new FileException("File không phải hình ảnh hoặc quá tải");
            }
        }
        return userRepository.save(user);
    }

    public String updatePhoneUser(String phone,User currUser){
        List<User> userList = getUsers();
        userList.remove(currUser);
        for(User user:userList){
            if(user.getPhone().equals(phone)){
                throw new UserException("Số điện thoại đã tồn tại trong hệ thống!");
            }
        }
        return phone;
    }

    public String updateEmailUser(String email,User currUser){
        List<User> userList = getUsers();
        userList.remove(currUser);
        for(User user:userList){
            if(user.getEmail().equals(email)){
                throw new UserException("Email đã tồn tại trong hệ thống!");
            }
        }
        return email;
    }

    public User updateUser(
            Long id,
            String name,
            String email,
            String phone,
            String birthday,
            boolean gender,
            boolean enable,
            MultipartFile img
            ) throws IOException {
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(birthday);

        User user = getUserById(id);
        user.setBirthday(date);
        user.setEnable(enable);
        user.setName(name);
        user.setPhone(updatePhoneUser(phone, user));
        user.setEmail(updateEmailUser(email, user));
        user.setDate_begin(LocalDateTime.now());
        user.setGender(gender);
        if (img != null) {
            if(fileChecker.isImage(img)){
                user.setImg(img.getBytes());
            }else{
                throw new FileException("File không phải hình ảnh hoặc quá tải");
            }
        }


        return userRepository.save(user);
    }


}
