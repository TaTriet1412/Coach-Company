package com.example.main.Controller;

import com.example.main.Entity.Contact;
import com.example.main.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/contacts")
@Controller
public class ContactController {
    @Autowired
    private ContactService contactService;

    @GetMapping
    public ResponseEntity<List<Contact>> getContacts(@RequestHeader Map<String,String> header){
        List<Contact> contacts = contactService.getContacts();
        return new ResponseEntity<>(contacts, HttpStatus.ACCEPTED);
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String phone,
            @RequestParam String address,
            @RequestParam String job,
            @RequestParam String message
    ){
        Contact contact = contactService.createContact(name,email,phone,address,job,message);
        return new ResponseEntity<>(contact,HttpStatus.ACCEPTED);
    }

    @PutMapping("{contactId}")
    public ResponseEntity<Contact> processContact(
            @PathVariable Long contactId,
            @RequestParam Long processor_id,
            @RequestParam String message_processor,
            @RequestParam String email_sender
    ){
        Contact contact = contactService.proccessContact(contactId,message_processor,processor_id,email_sender);
        return new ResponseEntity<>(contact,HttpStatus.ACCEPTED);
    }
}

