package com.example.main.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "seat")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String name;

    @Column
    private LocalDateTime date_begin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bus_id")
    @JsonBackReference
    private Bus bus;

    public Long getBusId() { return bus != null ? bus.getId() : null; }

    @PrePersist protected void onCreate() {
        if (date_begin == null) {
            date_begin = LocalDateTime.now();
        }
    }
}
