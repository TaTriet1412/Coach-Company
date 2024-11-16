package com.example.main.Controller;

import com.example.main.Entity.Seat;
import com.example.main.Service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/seats")
public class SeatController {
    @Autowired
    private SeatService seatService;

    @GetMapping
    public ResponseEntity<List<Seat>> getSeats(@RequestHeader Map<String,String> header){
        List<Seat> seats = seatService.getSeats();
        return new ResponseEntity<>(seats, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seat> getSeatById(@PathVariable Long id,@RequestHeader Map<String,String> header){
        Seat Seat = seatService.getSeatById(id);
        return new ResponseEntity<>(Seat, HttpStatus.ACCEPTED);
    }

    @GetMapping("/trip/{id}")
    public ResponseEntity<List<Seat>> getSeatsByTripId(@PathVariable Long id, @RequestHeader Map<String,String> header){
        List<Seat> seats = seatService.getSeatsByTripId(id);
        return new ResponseEntity<>(seats, HttpStatus.ACCEPTED);
    }

    @GetMapping("/trip/occupied/{id}")
    public ResponseEntity<List<Seat>> getSeatsIsOccupiedOfTrip(@PathVariable Long id, @RequestHeader Map<String,String> header){
        List<Seat> seats = seatService.getSeatListIsOccupiedOfTripId(id);
        return new ResponseEntity<>(seats, HttpStatus.ACCEPTED);
    }

}
