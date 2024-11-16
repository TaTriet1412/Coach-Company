package com.example.main.Entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;


@Data
@Entity
@Table(name = "ticket")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDateTime date_begin;

    @Column
    private boolean payment_status;

    @Column
    private LocalDateTime payment_time;

    @Column
    private String phone_customer;

    @Column
    private String name_customer;

    @Column
    private String email_customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id")
    @JsonBackReference
    private Trip trip;

    public Long getTripId() { return trip != null ? trip.getId() : null; }

    @ManyToMany
    @JoinTable(
            name = "ticket_seat",
            joinColumns = @JoinColumn(name = "ticket_id"),
            inverseJoinColumns = @JoinColumn(name = "seat_id")
    )
    private List<Seat> seats;

    @PrePersist protected void onCreate() {
        if (date_begin == null) {
            date_begin = LocalDateTime.now();
        }
    }

}
