package com.example.main.Controller;

import com.example.main.DTO.CreateRouteRequest;
import com.example.main.DTO.UpdateRouteRequest;
import com.example.main.Entity.Route;
import com.example.main.Service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/routes")
public class RouteController {
    @Autowired
    private RouteService routeService;

    @GetMapping
    public ResponseEntity<List<Route>> getRoutes(@RequestHeader Map<String,String> header){
        List<Route> routeList = routeService.getRoutes();
        return new ResponseEntity<>(routeList, HttpStatus.ACCEPTED);
    }

    @PostMapping
    public ResponseEntity<Route> addRoute(@RequestBody CreateRouteRequest request, @RequestHeader Map<String,String> header){
        Route route = routeService.addRoute(request);
        return new ResponseEntity<>(route,HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> removeRoute(@PathVariable Long id, @RequestHeader Map<String,String> header){
        routeService.deleteRoute(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Route> updateRoute(@PathVariable Long id, @RequestBody UpdateRouteRequest request, @RequestHeader Map<String,String> header){
        Route route = routeService.updateRoute(id,request);
        return new ResponseEntity<>(route,HttpStatus.ACCEPTED);
    }
}
