package com.example.main.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "trip")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private LocalDateTime time_start;

    @Column
    private LocalDateTime time_end;

    @Column
    private LocalDateTime date_begin;

    @Column
    private boolean enable;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bus_id")
    @JsonBackReference
    private Bus bus;
    public Long getBusId() { return bus != null ? bus.getId() : null; }


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "driver_id")
    @JsonBackReference
    private User driver;

    public Long getDriverId() { return driver != null ? driver.getId() : null; }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "codriver_id")
    @JsonBackReference
    private User codriver;

    public Long getCoDriverId() { return codriver != null ? codriver.getId() : null; }

    @OneToMany(mappedBy = "trip", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Ticket> ticketList;

    @PrePersist protected void onCreate() {
        enable = true;
        if (date_begin == null) {
            date_begin = LocalDateTime.now();
        }
    }
}
