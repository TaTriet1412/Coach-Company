package com.example.main.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "route")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;

    @Column
    private String start_point;

    @Column
    private String rest_point;

    @Column
    private String end_point;

    @Column
    private Integer duration;

    @Column
    private Integer distance;

    @Column
    private boolean enable;

    @Column
    private Integer price;

    @Column
    private LocalDateTime date_begin;

    public Route(String start_point, String rest_point, String end_point, Integer duration, Integer distance, Integer price) {
        this.start_point = start_point;
        this.rest_point = rest_point;
        this.end_point = end_point;
        this.duration = duration;
        this.distance = distance;
        this.price = price;
    }

    public Route(String start_point, String rest_point, String end_point, Integer duration, Integer distance, boolean enable, Integer price) {
        this.start_point = start_point;
        this.rest_point = rest_point;
        this.end_point = end_point;
        this.duration = duration;
        this.distance = distance;
        this.enable = enable;
        this.price = price;
    }

    @PrePersist protected void onCreate() {
        enable = true;
        if (date_begin == null) {
            date_begin = LocalDateTime.now();
        }
    }

    @OneToMany(mappedBy = "route", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Bus> busList;
}
