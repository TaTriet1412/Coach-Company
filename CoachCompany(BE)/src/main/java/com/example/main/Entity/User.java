package com.example.main.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String phone;

    @Column
    private LocalDate birthday;

    @Column
    private Integer role;

    @Column
    private LocalDateTime date_begin;

    @Column
    private boolean gender;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] img;

    @Column
    private boolean enable;

    public User(String name, String email, String phone, LocalDate birthday, Integer role, boolean gender) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.birthday = birthday;
        this.role = role;
        this.gender = gender;
    }

    @PrePersist protected void onCreate() {
        enable = true;
        if (date_begin == null) {
            date_begin = LocalDateTime.now();
        }
    }

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<News> newsList;
}
