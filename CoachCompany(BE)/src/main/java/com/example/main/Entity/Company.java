package com.example.main.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "company")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private String name;
    @Column
    private String email;
    @Column
    private String address;
    @Column
    private String map;
    @Column
    private String phone;
    @Column
    private String x;
    @Column
    private String facebook;
    @Column
    private String linkedin;
    @Column
    private String youtube;
    @Column
    private LocalDate open_date;
    @Column
    private LocalDateTime date_begin;
    @Column
    private boolean enable;
}
