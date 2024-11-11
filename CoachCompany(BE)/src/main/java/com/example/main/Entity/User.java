package com.example.main.Entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

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
    private LocalDateTime birthday;

    @Column
    private Integer role;

    @Column
    private LocalDateTime date_begin;

    @Column
    private boolean gender;

    @Column
    private String img;

    @Column
    private boolean enable;


}
