package com.example.main.Service;

import com.example.main.DTO.CreateTripRequest;
import com.example.main.DTO.UpdateTripRequest;
import com.example.main.Entity.*;
import com.example.main.Exception.TripException;
import com.example.main.Repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class TripService {
    @Autowired
    private BusService busService;
    @Autowired
    private UserService userService;
    @Autowired
    private RouteService routeService;
    @Autowired
    private TripRepository tripRepository;

    public List<Trip> getTrips(){
        return this.tripRepository.findAll();
    }

    public Trip getTripById(Long id){
        return this.tripRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User FreeDriver(Long id,LocalDateTime time_start, LocalDateTime time_end){
        User currUser = userService.getUserById(id);
        List<Trip> tripOfCurrUser = getTrips().stream()
                .filter(trip -> Objects.equals(trip.getDriver().getId(), id))
                .toList();
        for(Trip trip:tripOfCurrUser){
            if(
                    !(
                        (time_start.isBefore(trip.getTime_start()) && time_end.isBefore(trip.getTime_start())) ||
                        (time_start.isAfter(trip.getTime_end()) && time_end.isAfter(trip.getTime_end()))
                    ))
            {
                throw new TripException("Tài xế đã có lịch trong thời gian này");
            }
        }
        return currUser;
    }

    public User FreeDriver(Long id,LocalDateTime time_start, LocalDateTime time_end,Long tripId){
        User currUser = userService.getUserById(id);
        List<Trip> tripOfCurrUser = getTrips().stream()
                .filter(trip -> Objects.equals(trip.getDriver().getId(), id) && !Objects.equals(trip.getId(), tripId))
                .toList();
        for(Trip trip:tripOfCurrUser){
            if(
                    !(
                            (time_start.isBefore(trip.getTime_start()) && time_end.isBefore(trip.getTime_start())) ||
                                    (time_start.isAfter(trip.getTime_end()) && time_end.isAfter(trip.getTime_end()))
                    ))
            {
                throw new TripException("Tài xế đã có lịch trong thời gian này");
            }
        }
        return currUser;
    }

    public User FreeCoDriver(Long id,LocalDateTime time_start, LocalDateTime time_end){
        User currUser = userService.getUserById(id);
        List<Trip> tripOfCurrUser = getTrips().stream()
                .filter(trip -> Objects.equals(trip.getCodriver().getId(), id))
                .toList();
        for(Trip trip:tripOfCurrUser){
            if(
                    !(
                            (time_start.isBefore(trip.getTime_start()) && time_end.isBefore(trip.getTime_start())) ||
                                    (time_start.isAfter(trip.getTime_end()) && time_end.isAfter(trip.getTime_end()))
                    ))
            {
                throw new TripException("Phụ lái đã có lịch trong thời gian này");
            }
        }
        return currUser;
    }

    public User FreeCoDriver(Long id,LocalDateTime time_start, LocalDateTime time_end,Long tripId){
        User currUser = userService.getUserById(id);
        List<Trip> tripOfCurrUser = getTrips().stream()
                .filter(trip -> Objects.equals(trip.getCodriver().getId(), id) && !Objects.equals(trip.getId(), tripId))
                .toList();
        for(Trip trip:tripOfCurrUser){
            if(
                    !(
                            (time_start.isBefore(trip.getTime_start()) && time_end.isBefore(trip.getTime_start())) ||
                                    (time_start.isAfter(trip.getTime_end()) && time_end.isAfter(trip.getTime_end()))
                    ))
            {
                throw new TripException("Phụ lái đã có lịch trong thời gian này");
            }
        }
        return currUser;
    }

    public Bus FreeBus(Long id,LocalDateTime time_start, LocalDateTime time_end){
        Bus currBus = busService.getBusById(id);
        List<Trip> tripOfCurrUser = getTrips().stream()
                .filter(trip -> Objects.equals(trip.getBus().getId(), id))
                .toList();
        for(Trip trip:tripOfCurrUser){
            if(
                    !(
                            (time_start.isBefore(trip.getTime_start()) && time_end.isBefore(trip.getTime_start())) ||
                                    (time_start.isAfter(trip.getTime_end()) && time_end.isAfter(trip.getTime_end()))
                    ))
            {
                throw new TripException("Xe đã có lịch trong thời gian này");
            }
        }
        return currBus;
    }

    public Bus FreeBus(Long id,LocalDateTime time_start, LocalDateTime time_end,Long tripId){
        Bus currBus = busService.getBusById(id);
        List<Trip> tripOfCurrUser = getTrips().stream()
                .filter(trip -> Objects.equals(trip.getBus().getId(), id) && !Objects.equals(trip.getId(), tripId))
                .toList();
        for(Trip trip:tripOfCurrUser){
            if(
                    !(
                            (time_start.isBefore(trip.getTime_start()) && time_end.isBefore(trip.getTime_start())) ||
                                    (time_start.isAfter(trip.getTime_end()) && time_end.isAfter(trip.getTime_end()))
                    ))
            {
                throw new TripException("Xe đã có lịch trong thời gian này");
            }
        }
        return currBus;
    }

    public LocalDateTime calculateEndTime(LocalDateTime dateTimeStart, Integer durationInSeconds){
        Duration duration  = Duration.ofSeconds(durationInSeconds);
        return dateTimeStart.plus(duration);
    }

    public Trip addTrip(CreateTripRequest request){
//      Time start
        LocalDateTime time_start = LocalDateTime.parse(request.getDate_time_start());
//      Time end
        LocalDateTime time_end = calculateEndTime(time_start,request.getDuration());
//      Driver
        User driver = userService.getUserById(request.getDriver_id());
//      CoDriver
        User coDriver = userService.getUserById(request.getCodriver_id());
//      Bus
        Bus bus = busService.getBusById(request.getBus_id());
//      Route
        Route route = routeService.getRouteById(bus.getRouteId());


//      Exception
        if(!bus.isEnable()) throw new TripException("Xe đã ngừng hoạt động");
        if(!driver.isEnable()) throw new TripException("Tài xế đã hết hợp đồng");
        if(!coDriver.isEnable()) throw new TripException("Phụ lái đã hết hợp đồng");

        Trip trip = new Trip();
        trip.setTime_start(time_start);
        trip.setTime_end(time_end);
        trip.setDriver(FreeDriver(request.getDriver_id(),time_start,time_end));
        trip.setCodriver(FreeCoDriver(request.getCodriver_id(),time_start,time_end));
        trip.setBus(FreeBus(request.getBus_id(),time_start,time_end));
        return tripRepository.save(trip);
    }

    public Trip updateTrip(Long id, UpdateTripRequest request) throws TripException {
        Trip trip = getTripById(id);
        //      Time start
        LocalDateTime time_start = LocalDateTime.parse(request.getDate_time_start());
//      Time end
        LocalDateTime time_end = calculateEndTime(time_start,request.getDuration());
//      Driver
        User driver = userService.getUserById(request.getDriver_id());
//      CoDriver
        User coDriver = userService.getUserById(request.getCodriver_id());
//      Bus
        Bus bus = busService.getBusById(request.getBus_id());
//      Route
        Route route = routeService.getRouteById(bus.getRouteId());


//      Exception
        if(!bus.isEnable()) throw new TripException("Xe đã ngừng hoạt động");
        if(!driver.isEnable()) throw new TripException("Tài xế đã hết hợp đồng");
        if(!coDriver.isEnable()) throw new TripException("Phụ lái đã hết hợp đồng");
        if(trip.getTime_end().isBefore(LocalDateTime.now())) throw new TripException("Chuyến đã hoàn thành");


        trip.setTime_start(time_start);
        trip.setTime_end(time_end);
        trip.setDriver(FreeDriver(request.getDriver_id(),time_start,time_end,id));
        trip.setCodriver(FreeCoDriver(request.getCodriver_id(),time_start,time_end,id));
        trip.setBus(FreeBus(request.getBus_id(),time_start,time_end,id));
        trip.setEnable(request.isEnable());
        return tripRepository.save(trip);
    }

    public List<Seat> getSeatsIsOccupiedOfByTripId(Long tripId) {
        Trip trip = getTripById(tripId);
        List<Ticket> ticketList = trip.getTicketList();
        List<Seat> seatList = new ArrayList<>();
        for(Ticket ticket:ticketList){
            seatList.addAll(ticket.getSeats());
        }
        return seatList;
    }

    public List<Seat> getSeatsOfByTripId(Long tripId){
        Trip trip = getTripById(tripId);
        Bus bus = trip.getBus();
        return bus.getSeatList();
    }
}
