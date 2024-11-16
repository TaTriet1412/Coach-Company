package com.example.main.Controller;

import com.example.main.DTO.CreateBusRequest;
import com.example.main.DTO.CreateUserRequest;
import com.example.main.DTO.UpdateBusRequest;
import com.example.main.DTO.UpdateUserRequest;
import com.example.main.Entity.Bus;
import com.example.main.Service.BusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/buses")
@Controller
public class BusController {
    @Autowired
    private BusService busService;

    @GetMapping
    public ResponseEntity<List<Bus>> getUsers(@RequestHeader Map<String,String> header){
        List<Bus> buses = busService.getBuses();
        return new ResponseEntity<>(buses, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bus> getUserById(@PathVariable Long id,@RequestHeader Map<String,String> header){
        Bus bus = busService.getBusById(id);
        return new ResponseEntity<>(bus, HttpStatus.ACCEPTED);
    }

    @PostMapping
    public ResponseEntity<Bus> addBus(@RequestBody CreateBusRequest request, @RequestHeader Map<String,String> header){
        Bus user = busService.addBus(request);
        return new ResponseEntity<>(user,HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bus> updateBus(@PathVariable Long id, @RequestBody UpdateBusRequest request, @RequestHeader Map<String,String> header){
        Bus bus = busService.updateBus(id,request);
        return new ResponseEntity<>(bus,HttpStatus.ACCEPTED);
    }
}
