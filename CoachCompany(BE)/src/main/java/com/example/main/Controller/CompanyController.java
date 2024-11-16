package com.example.main.Controller;

import com.example.main.Entity.Company;
import com.example.main.Service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/company")
@Controller
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @GetMapping
    public ResponseEntity<Company> getCompany(@RequestHeader Map<String,String> header){
        Company company = companyService.getCompanyFirst();
        return new ResponseEntity<>(company, HttpStatus.ACCEPTED);
    }

}
