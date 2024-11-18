package com.example.main.Controller;

import com.example.main.Entity.Route;
import com.example.main.Service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @GetMapping("/{id}")
    public ResponseEntity<Route> getRouteById(@PathVariable Long id, @RequestHeader Map<String,String> header){
        Route route = routeService.getRouteById(id);
        return new ResponseEntity<>(route, HttpStatus.ACCEPTED);
    }

    @PostMapping
    public ResponseEntity<Route> addRoute(
            @RequestParam String start_point,
            @RequestParam String rest_point,
            @RequestParam String end_point,
            @RequestParam Integer duration,
            @RequestParam Integer distance,
            @RequestParam Integer price,
            @RequestPart(required = false) MultipartFile img,
            @RequestHeader Map<String,String> header) throws IOException {
        Route route = routeService.addRoute(start_point,rest_point,end_point,duration,distance,price,img);
        return new ResponseEntity<>(route,HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> removeRoute(@PathVariable Long id, @RequestHeader Map<String,String> header){
        routeService.deleteRoute(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Route> updateRoute(
            @PathVariable Long id,
            @RequestParam String start_point,
            @RequestParam String rest_point,
            @RequestParam String end_point,
            @RequestParam Integer duration,
            @RequestParam Integer distance,
            @RequestParam Integer price,
            @RequestPart(required = false) MultipartFile img,
            @RequestParam boolean enable,
            @RequestHeader Map<String,String> header) throws IOException {
        Route route = routeService.updateRoute(id,start_point,rest_point,end_point,duration,distance,price,img,enable);
        return new ResponseEntity<>(route,HttpStatus.ACCEPTED);
    }
}
