package com.example.main.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "news")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class News {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Column
    private boolean enable;

    @Column
    private LocalDateTime date_begin;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] img;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User user;

    public Long getUserId() { return user != null ? user.getId() : null; }

    @PrePersist protected void onCreate() {
        enable = true;
        if (date_begin == null) {
            date_begin = LocalDateTime.now();
        }
    }
}
