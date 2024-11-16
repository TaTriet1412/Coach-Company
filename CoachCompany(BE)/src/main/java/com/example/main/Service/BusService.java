package com.example.main.Service;

import com.example.main.DTO.CreateBusRequest;
import com.example.main.DTO.UpdateBusRequest;
import com.example.main.Entity.Bus;
import com.example.main.Entity.Seat;
import com.example.main.Entity.Route;
import com.example.main.Exception.BusException;
import com.example.main.Repository.BusRepository;
import com.example.main.Repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class BusService {
    @Autowired
    private BusRepository busRepository;
    @Autowired
    private SeatRepository seatRepository;
    @Autowired
    private RouteService routeService;

    public List<Bus> getBuses(){
        return this.busRepository.findAll();
    }

    public Bus getBusById(Long id){
        return this.busRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Bus addBus(CreateBusRequest request){
        Bus bus = new Bus();
        Route currRoute = routeService.getRouteById(request.getRoute_id());
        if(!hasBusNumber(request.getNumber_bus(), currRoute)){
            bus.setNumber_bus(request.getNumber_bus());
            bus.setRoute(currRoute);
        }
        // Lưu Bus vào cơ sở dữ liệu
        Bus savedBus = busRepository.save(bus);


        // Tạo danh sách ghế
        List<Seat> seats = new ArrayList<>();
        for (int i = 1; i <= 15; i++) {
            String seatName = String.format("A%02d", i);
            Seat seat = new Seat();
            seat.setName(seatName);
            seat.setBus(savedBus);
            seats.add(seat);
        }
        for (int i = 1; i <= 15; i++) {
            String seatName = String.format("A%02d", i);
            Seat seat = new Seat();
            seatName = String.format("B%02d", i);
            seat.setName(seatName);
            seat.setBus(savedBus);
            seats.add(seat);
        }

        // Lưu các ghế vào cơ sở dữ liệu
        seatRepository.saveAll(seats);

        return busRepository.save(bus);
    }

    public boolean hasBusNumber(String number_bus, Route route) {
        List<Bus> busList = getBuses();
        for(Bus bus:busList){
            if(bus.getRoute()==route && bus.getNumber_bus().equals(number_bus)){
                throw new BusException("Tên xe đã tồn tại trong tuyến!");
            }
        }
        return false;
    }

    public String updateBusNumber(String number_bus, Route route,Bus busCurr){
        List<Bus> busList = getBuses();
        busList.remove(busCurr);
        for(Bus bus:busList){
            if(bus.getRoute()==route && bus.getNumber_bus().equals(number_bus)){
                throw new BusException("Tên xe đã tồn tại trong tuyến!");
            }
        }
        return number_bus;
    }

    public Bus updateBus(Long id, UpdateBusRequest request) throws BusException {
        Bus bus = getBusById(id);
        bus.setNumber_bus(updateBusNumber(request.getNumber_bus(),bus.getRoute(),bus));
        bus.setEnable(request.isEnable());
        bus.setDate_begin(LocalDateTime.now());
        return busRepository.save(bus);
    }
}