package com.example.main.Repository;

import com.example.main.Entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeatRepository extends JpaRepository<Seat,Long> {
}
