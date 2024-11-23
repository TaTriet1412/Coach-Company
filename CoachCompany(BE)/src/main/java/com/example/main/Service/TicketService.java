package com.example.main.Service;

import com.example.main.DTO.CreateTicketRequest;
import com.example.main.DTO.UpdateTicketRequest;
import com.example.main.Entity.*;
import com.example.main.Exception.TicketException;
import com.example.main.Repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.*;

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

    @Autowired
    private JavaMailSender javaMailSender;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
    private final ConcurrentHashMap<Long, ScheduledFuture<?>> scheduledTasks = new ConcurrentHashMap<>();



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

    public void hasSeatOccupied(Long tripId,Long[] seatListReqId){
//       find seatList
        List<Seat> seatListReq = new ArrayList<>();
        for(Long seatId:seatListReqId) {
            seatListReq.add(seatService.getSeatById(seatId));
        }

//        check chair is occupied or not
        for(Seat seat:seatListReq){
            if(isSeatOccupied(tripId,seat)) {
                throw new TicketException("Ghế đã có người đặt");
            }
        }
    }

    public boolean isSeatOccupied(Long tripId,Seat seatCurr){
        Trip trip = tripService.getTripById(tripId);
        List<Ticket> ticketList = trip.getTicketList();
        List<Seat> resultSeatList = new ArrayList<>();
        for(Ticket ticket: ticketList) {
            resultSeatList.addAll(ticket.getSeats());
        }
        return resultSeatList.contains(seatCurr);
    }

    public Ticket addTiket(CreateTicketRequest request){
        Ticket ticket = new Ticket();
        hasSeatOccupied(request.getTrip_id(),request.getSeat_list());

        ticket.setEmail_customer(request.getEmail_customer());
        ticket.setName_customer(request.getName_customer());
        ticket.setPhone_customer(request.getPhone_customer());
        Trip currTrip = tripService.getTripById(request.getTrip_id());
        if(currTrip.getTime_start().isBefore(LocalDateTime.now())){
            throw new TicketException("Chuyến đã khởi hành!");
        }

        ticket.setTrip(tripService.getTripById(request.getTrip_id()));
        List<Seat> seatChoosenList = new LinkedList<>();
        for(Long id:request.getSeat_list()){
            Seat seatCurr = seatService.getSeatById(id);
            seatChoosenList.add(seatCurr);
        }
        ticket.setSeats(seatChoosenList);



//       10 minutes to delete
        Ticket savedTicket = ticketRepository.save(ticket);
//        scheduleTicketDeletion(savedTicket.getId(), 1, TimeUnit.MINUTES);
        scheduleTicketDeletion(savedTicket.getId(), 10, TimeUnit.MINUTES);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tatriet_tony@1zulieu.com");
        message.setTo(request.getEmail_customer());
        message.setSubject("Thông tin vé của quý khách " + request.getName_customer());
        message.setText("Mã vé của quý khách là: "+ ticket.getId() + "\nSố điện thoại là : " + request.getPhone_customer());
        javaMailSender.send(message);

        return ticketRepository.save(ticket);
    }

    public Ticket updateTicket(UpdateTicketRequest request, Long ticketId) {
        Ticket ticket = getTicketById(ticketId);
        Trip trip = ticket.getTrip();
        if(trip.getTime_start().isBefore(LocalDateTime.now())){
            throw new TicketException("Chuyến đã khởi hành");
        }

//        Cập nhật vé sau khi thanh toán
        if(ticket.isPayment_status()){
            if(request.getTrip_id()!=ticket.getTripId()) {
                throw new TicketException("Không được thay đổi tuyến sau khi thanh toán");
            }else
            if(request.getSeat_list().length != ticket.getSeats().size()){
                throw new TicketException("Số lượng ghế không được khác sau khi thanh toán");
            }else if(!request.isPayment_status()){
                throw new TicketException("Vé đã thanh toán rồi");
            }
        }

//        Cap nhat ve
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

//        Cập nhật vé khi thanh toán thành công
        if(request.isPayment_status() && !ticket.isPayment_status()){
            ticket.setPayment_time(LocalDateTime.now());
            // Cancel the scheduled deletion task if the payment is updated
            ScheduledFuture<?> scheduledTask = scheduledTasks.get(ticketId);
            if (scheduledTask != null) {
                scheduledTask.cancel(false);
                scheduledTasks.remove(ticketId);
            }
        }

        return ticketRepository.save(ticket);
    }

    public Ticket updatePayment(Long id) {
        Ticket ticket = getTicketById(id);
        ticket.setPayment_status(true);
        ticket.setPayment_time(LocalDateTime.now());

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("tatriet_tony@1zulieu.com");
        message.setTo(ticket.getEmail_customer());
        message.setSubject("Thanh toán vé xe khách Quốc Thịnh thành công " );
        message.setText("Mã vé của quý khách là: "+ ticket.getId() +
                "\nHọ tên: " + ticket.getName_customer() +
                "\nEmail: " + ticket.getEmail_customer() +
                "\nSố điện thoại là : " + ticket.getPhone_customer());
        javaMailSender.send(message);
        // Cancel the scheduled deletion task if the payment is updated
        ScheduledFuture<?> scheduledTask = scheduledTasks.get(id); if (scheduledTask != null) {
            scheduledTask.cancel(false);
            scheduledTasks.remove(id);
        }
        return ticketRepository.save(ticket);
    }

    public Ticket cancleAutoRemove(Long id) {
        Ticket ticket = getTicketById(id);
        // Cancel the scheduled deletion task if the payment is updated
        ScheduledFuture<?> scheduledTask = scheduledTasks.get(id); if (scheduledTask != null) {
            scheduledTask.cancel(false);
            scheduledTasks.remove(id);
        }
        return ticketRepository.save(ticket);
    }



    private void scheduleTicketDeletion(Long ticketId, long delay, TimeUnit unit) {
        ScheduledFuture<?> scheduledTask = scheduler.schedule(() -> deleteTicket(ticketId), delay, unit);
        scheduledTasks.put(ticketId, scheduledTask);
    }
    public void deleteTicket(Long ticketId) {
        Ticket ticket = getTicketById(ticketId);
        if(ticket.isPayment_status()){
            throw new TicketException("Vé đã thanh toán");
        }
        ticketRepository.deleteById(ticketId);
    }
}
