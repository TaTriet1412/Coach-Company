package com.example.main.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "contact")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name_sender;

    @Column
    private String phone_sender;

    @Column
    private String email_sender;

    @Column
    private String address_sender;

    @Column
    private String job_sender;

    @Column(columnDefinition = "LONGTEXT")
    private String message_sender;

    @Column
    private LocalDateTime date_begin;

    @Column(columnDefinition = "LONGTEXT")
    private String message_processor;

    @Column
    private LocalDateTime process_time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "processor_id")
    private User processor;

    public Long getProcessorId() { return processor != null ? processor.getId() : null; }

    @PrePersist protected void onCreate() {
        if (date_begin == null) {
            date_begin = LocalDateTime.now();
        }
    }
}
