package com.example.main.Controller;

import com.example.main.DTO.CreateTicketRequest;
import com.example.main.DTO.UpdateTicketRequest;
import com.example.main.Entity.Ticket;
import com.example.main.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tickets")
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @GetMapping
    public ResponseEntity<List<Ticket>> getTikets(@RequestHeader Map<String,String> header){
        List<Ticket> tickets = ticketService.getTickets();
        return new ResponseEntity<>(tickets, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id,@RequestHeader Map<String,String> header){
        Ticket ticket = ticketService.getTicketById(id);
        return new ResponseEntity<>(ticket, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}/price")
    public ResponseEntity<Integer> getTicketPrice(@PathVariable Long id,@RequestHeader Map<String,String> header){
        Integer price = ticketService.getPriceOfTicket(id);
        return new ResponseEntity<>(price, HttpStatus.ACCEPTED);
    }

    @PostMapping
    public ResponseEntity<Ticket> addTicket(@RequestBody CreateTicketRequest request, @RequestHeader Map<String,String> header){
        Ticket ticket = ticketService.addTiket(request);
        return new ResponseEntity<>(ticket,HttpStatus.CREATED);
    }
    @PostMapping("{ticket_id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long ticket_id,@RequestBody UpdateTicketRequest request, @RequestHeader Map<String,String> header){
        Ticket ticket = ticketService.updateTicket(request,ticket_id);
        return new ResponseEntity<>(ticket,HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTicket(@PathVariable Long id,@RequestHeader Map<String,String> header){
        ticketService.deleteTicket(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @GetMapping("/pay/{ticketId}")
    public ResponseEntity<Ticket> updatePaymentTicket(@PathVariable Long ticketId,@RequestHeader Map<String,String> header){
        Ticket ticket =  ticketService.updatePayment(ticketId);
        return new ResponseEntity<>(ticket,HttpStatus.ACCEPTED);
    }

    @GetMapping("/cancle-auto-remove/{ticketId}")
    public ResponseEntity<Ticket> cancleAutoRemove(@PathVariable Long ticketId,@RequestHeader Map<String,String> header){
        Ticket ticket =  ticketService.cancleAutoRemove(ticketId);
        return new ResponseEntity<>(ticket,HttpStatus.ACCEPTED);
    }

}
