package com.example.main.Service;

import com.example.main.Entity.Contact;
import com.example.main.Repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender javaMailSender;

    public List<Contact> getContacts(){
        return contactRepository.findAll();
    }

    public Contact getContactById(Long id){
        return contactRepository.findById(id).orElseThrow(() -> new RuntimeException("Contact not found"));
    }

    public Contact proccessContact(Long id,String message_processor,Long process_id,String email){
        Contact contact = getContactById(id);
        contact.setProcessor(userService.getUserById(process_id));
        contact.setMessage_processor(message_processor);
        contact.setProcess_time(LocalDateTime.now());


        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tatriet_tony@1zulieu.com");
        message.setTo(email);
        message.setSubject("Phản hồi liên hệ của bạn từ nhà xe Quốc Thịnh");
        message.setText(message_processor);
        javaMailSender.send(message);

        return contactRepository.save(contact);
    }

    public  Contact createContact(String name,String email, String phone, String address, String job, String message){
        Contact contact = new Contact();
        contact.setName_sender(name);
        contact.setPhone_sender(phone);
        contact.setEmail_sender(email);
        contact.setJob_sender(job);
        contact.setMessage_sender(message);
        contact.setAddress_sender(address);
        return contactRepository.save(contact);
    }

//    contact.setName_sender(name_sender);
//        contact.setAddress_sender(address_sender);
//        contact.setEmail_sender(email_sender);
//        contact.setJob_sender(job_sender);
//        contact.setMessage_sender(message_sender);
//        contact.setPhone_sender(phone_sender);
}
