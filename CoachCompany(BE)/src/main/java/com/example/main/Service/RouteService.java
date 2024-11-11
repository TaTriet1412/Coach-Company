package com.example.main.Service;

import com.example.main.DTO.CreateRouteRequest;
import com.example.main.DTO.UpdateRouteRequest;
import com.example.main.Entity.Route;
import com.example.main.Repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RouteService {
    @Autowired
    private RouteRepository routeRepository;

    public List<Route> getRoutes(){
        return this.routeRepository.findAll();
    }

    public Route getRouteById(Long id){
        return this.routeRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Route addRoute(CreateRouteRequest request){
        Route route = new Route(
                request.getStart_point(),
                request.getRest_point(),
                request.getEnd_point(),
                request.getDuration(),
                request.getDistance(),
                request.getPrice()
        );

        return routeRepository.save(route);
    }

    public void deleteRoute(Long id){
        routeRepository.deleteById(id);
    }

    public Route updateRoute(Long id, UpdateRouteRequest request) {
        Route route = getRouteById(id);
        route.setDuration(request.getDuration());
        route.setDistance(request.getDistance());
        route.setPrice(request.getPrice());
        route.setEnd_point(request.getEnd_point());
        route.setEnable(request.isEnable());
        route.setRest_point(request.getRest_point());
        route.setStart_point(request.getStart_point());
        route.setDate_begin(LocalDateTime.now());
        return routeRepository.save(route);
    }
}
