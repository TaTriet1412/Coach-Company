package com.example.main.Service;

import com.example.main.Entity.Bus;
import com.example.main.Entity.Seat;
import com.example.main.Entity.Ticket;
import com.example.main.Entity.Trip;
import com.example.main.Exception.SeatException;
import com.example.main.Repository.BusRepository;
import com.example.main.Repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

@Service
public class SeatService {
    @Autowired
    private SeatRepository seatRepository;
    @Autowired
    private BusService busService;
    @Autowired
    private TripService tripService;


    public List<Seat> getSeats(){
        return this.seatRepository.findAll();
    }


    public List<Seat> getSeatsByTripId(Long tripId) {
        Trip trip = tripService.getTripById(tripId);
        Bus bus = busService.getBusById(trip.getBusId());
        List<Seat> resultSeats = getSeats();
        resultSeats.removeIf(seat -> seat.getBus().getId() != bus.getId()); // Safe and concise
        return resultSeats;
    }

    public List<Seat> getSeatListIsOccupiedOfTripId(Long tripId) {
        Trip trip = tripService.getTripById(tripId);
        List<Ticket> ticketListOfCurrTrip = trip.getTicketList();
        List<Seat> occupiedSeats = new ArrayList<>();
        for (Ticket ticket : ticketListOfCurrTrip) {
            occupiedSeats.addAll(ticket.getSeats());
        }

        return occupiedSeats;
    }



    public Seat getSeatById(Long id){
        return this.seatRepository.findById(id).orElseThrow(() -> new SeatException("Ticket not found"));
    }
}
