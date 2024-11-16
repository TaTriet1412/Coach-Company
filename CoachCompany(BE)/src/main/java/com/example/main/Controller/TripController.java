package com.example.main.Controller;

import com.example.main.DTO.CreateTripRequest;
import com.example.main.DTO.UpdateTripRequest;
import com.example.main.Entity.Trip;
import com.example.main.Service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/trips")
@Controller
public class TripController {
    @Autowired
    private TripService tripService;

    @GetMapping
    public ResponseEntity<List<Trip>> getUsers(@RequestHeader Map<String,String> header){
        List<Trip> trips = tripService.getTrips();
        return new ResponseEntity<>(trips, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getUsers(@PathVariable Long id,@RequestHeader Map<String,String> header){
        Trip trip = tripService.getTripById(id);
        return new ResponseEntity<>(trip, HttpStatus.ACCEPTED);
    }

    @PostMapping
    public ResponseEntity<Trip> addTrip(@RequestBody CreateTripRequest request, @RequestHeader Map<String,String> header){
        Trip trip = tripService.addTrip(request);
        return new ResponseEntity<>(trip,HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Long id, @RequestBody UpdateTripRequest request, @RequestHeader Map<String,String> header){
        Trip Trip = tripService.updateTrip(id,request);
        return new ResponseEntity<>(Trip,HttpStatus.ACCEPTED);
    }

}
