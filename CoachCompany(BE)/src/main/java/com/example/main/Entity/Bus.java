package com.example.main.Entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "bus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String number_bus;

    @Column
    private LocalDateTime date_begin;

    @Column
    private boolean enable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "route_id")
    private Route route;

    public Long getRouteId() { return route != null ? route.getId() : null; }

    @OneToMany(mappedBy = "bus", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Seat> seatList;

    @PrePersist protected void onCreate() {
        enable = true;
        if (date_begin == null) {
            date_begin = LocalDateTime.now();
        }
    }

    public Bus(String number_bus){
        setNumber_bus(number_bus);
    }
}
