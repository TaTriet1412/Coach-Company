package com.example.main.Service;

import com.example.main.DTO.CreateRouteRequest;
import com.example.main.DTO.UpdateRouteRequest;
import com.example.main.Entity.Bus;
import com.example.main.Entity.Route;
import com.example.main.Entity.Trip;
import com.example.main.Exception.FileException;
import com.example.main.Exception.RouteException;
import com.example.main.FileHandle.FileChecker;
import com.example.main.Repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class RouteService {
    @Autowired
    private RouteRepository routeRepository;

    private final FileChecker fileChecker = new FileChecker();

    public List<Route> getRoutes(){
        return this.routeRepository.findAll();
    }


    public Route getRouteById(Long id){
        return this.routeRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteRoute(Long id){
        routeRepository.deleteById(id);
    }

    public Route updateRoute(Long id,String startPoint, String restPoint, String endPoint, Integer duration, Integer distance, Integer price, MultipartFile img, boolean enable) throws IOException {
        Route route = getRouteById(id);
        checkStartPoint_EndPoint(startPoint,endPoint,id);
        route.setStart_point(startPoint);
//        Process file is img or not
        if (img != null) {
            if(fileChecker.isImage(img)){
                route.setImg(img.getBytes());
            }else{
                throw new FileException("File không phải hình ảnh hoặc quá tải");
            }
        }
        route.setRest_point(restPoint);
        route.setEnd_point(endPoint);
        route.setDistance(distance);
        route.setDuration(duration);
        route.setPrice(price);
        route.setDate_begin(LocalDateTime.now());
        route.setEnable(enable);
        if(enable){
            for(Bus bus:route.getBusList()){
                bus.setEnable(true);
                for(Trip trip: bus.getTripList()){
                    trip.setEnable(true);
                }
            }
        }else {
            for(Bus bus:route.getBusList()){
                bus.setEnable(false);
                for (Trip trip:bus.getTripList()){
                    trip.setEnable(false);
                }
            }
        }
        return routeRepository.save(route);
    }

    public Route addRoute(String startPoint, String restPoint, String endPoint, Integer duration, Integer distance, Integer price, MultipartFile img) throws IOException {
        Route route = new Route();
        checkStartPoint_EndPoint(startPoint,endPoint);
        route.setStart_point(startPoint);
        if (img != null) {
            if(fileChecker.isImage(img)){
                route.setImg(img.getBytes());
            }else{
                throw new FileException("File không phải hình ảnh hoặc quá tải");
            }
        }
        route.setRest_point(restPoint);
        route.setEnd_point(endPoint);
        route.setDistance(distance);
        route.setDuration(duration);
        route.setPrice(price);
        return routeRepository.save(route);
    }

    public void checkStartPoint_EndPoint(String startPoint, String endPoint){
        List<Route> routeList = getRoutes();
        for(Route route:routeList) {
            if(route.getStart_point().toLowerCase().trim().equals(startPoint.toLowerCase().trim())
         &&        route.getEnd_point().toLowerCase().trim().equals(endPoint.toLowerCase().trim())
            ) {
                throw new RouteException("Tên tuyến này đã tồn tại");
            }
        }
    }

    public void checkStartPoint_EndPoint(String startPoint, String endPoint,Long id){
        List<Route> routeList = getRoutes();
        for(Route route:routeList) {
            if(route.getId()!=id) {
                if(route.getStart_point().toLowerCase().trim().equals(startPoint.toLowerCase().trim())
                        &&        route.getEnd_point().toLowerCase().trim().equals(endPoint.toLowerCase().trim())
                ) {
                    throw new RouteException("Tên tuyến này đã tồn tại");
                }
            }
        }
    }
}
