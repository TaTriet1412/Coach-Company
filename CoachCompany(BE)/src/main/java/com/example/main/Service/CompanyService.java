package com.example.main.Service;

import com.example.main.Entity.Company;
import com.example.main.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getCompanies(){
        return this.companyRepository.findAll();
    }

    public Company getCompanyFirst(){
        List<Company> companies = getCompanies();
        for(Company company:companies){
            if(company.isEnable()) return company;
        }
        return null;
    }
}
