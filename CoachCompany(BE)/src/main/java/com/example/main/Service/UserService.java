package com.example.main.Service;

import com.example.main.Entity.User;
import com.example.main.Exception.UserException;
import com.example.main.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

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

}
