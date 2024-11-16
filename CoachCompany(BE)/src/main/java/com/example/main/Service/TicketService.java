package com.example.main.Service;

import com.example.main.DTO.CreateTicketRequest;
import com.example.main.DTO.UpdateTicketRequest;
import com.example.main.Entity.*;
import com.example.main.Exception.TicketException;
import com.example.main.Repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private TripService tripService;

    @Autowired
    private SeatService seatService;

    @Autowired
    private BusService busService;

    @Autowired
    private RouteService routeService;


    public List<Ticket> getTickets(){
        return this.ticketRepository.findAll();
    }

    public Ticket getTicketById(Long id){
        return this.ticketRepository.findById(id).orElseThrow(() -> new TicketException("Ticket not found"));
    }

    public Integer getPriceOfTicket(Long ticketId){
        Ticket ticket = getTicketById(ticketId);
        Trip trip = tripService.getTripById(ticket.getTripId());
        Bus bus = busService.getBusById(trip.getBusId());
        Route route = routeService.getRouteById(bus.getRouteId());
        Integer totalPrice = route.getPrice();
        Integer quantity=0;
        for(Seat seat: ticket.getSeats()){
            quantity++;
        }
        totalPrice*=quantity;
        return totalPrice;

    }

    public Ticket addTiket(CreateTicketRequest request){
        Ticket ticket = new Ticket();
        ticket.setEmail_customer(request.getEmail_customer());
        ticket.setName_customer(request.getName_customer());
        ticket.setPhone_customer(request.getPhone_customer());
        ticket.setTrip(tripService.getTripById(request.getTrip_id()));
        List<Seat> seatChoosenList = new LinkedList<>();
        for(Long id:request.getSeat_list()){
            Seat seatCurr = seatService.getSeatById(id);
            seatChoosenList.add(seatCurr);
        }
        ticket.setSeats(seatChoosenList);
        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(UpdateTicketRequest request, Long ticketId) {
        Ticket ticket = getTicketById(ticketId);
        ticket.setPayment_status(request.isPayment_status());
        ticket.setEmail_customer(request.getEmail_customer());
        ticket.setName_customer(request.getName_customer());
        ticket.setPhone_customer(request.getPhone_customer());

        ticket.setTrip(tripService.getTripById(request.getTrip_id()));
        List<Seat> seatChoosenList = new LinkedList<>();
        for(Long id:request.getSeat_list()){
            Seat seatCurr = seatService.getSeatById(id);
            seatChoosenList.add(seatCurr);
        }
        ticket.setSeats(seatChoosenList);
        ticket.setDate_begin(LocalDateTime.now());
        if(request.isPayment_status()){
            ticket.setPayment_time(LocalDateTime.now());
        }else{
            ticket.setPayment_time(null);
        }
        return ticketRepository.save(ticket);

    }
}
