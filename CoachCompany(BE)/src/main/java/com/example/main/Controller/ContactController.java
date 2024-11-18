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

//@RequestParam String name_sender,
//@RequestParam String phone_sender,
//@RequestParam String email_sender,
//@RequestParam String address_sender,
//@RequestParam String message_sender,
//@RequestParam String job_sender,
