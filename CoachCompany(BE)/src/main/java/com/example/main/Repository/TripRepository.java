package com.example.main.Repository;

import com.example.main.Entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip,Long> {
}
