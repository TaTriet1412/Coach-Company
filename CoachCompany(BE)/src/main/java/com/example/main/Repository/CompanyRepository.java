package com.example.main.Repository;

import com.example.main.Entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company,Long> {
}
