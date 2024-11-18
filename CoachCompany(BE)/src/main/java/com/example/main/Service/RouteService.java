package com.example.main.Service;

import com.example.main.DTO.CreateRouteRequest;
import com.example.main.DTO.UpdateRouteRequest;
import com.example.main.Entity.Bus;
import com.example.main.Entity.Route;
import com.example.main.Exception.FileException;
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
        route.setEnable(enable);
        route.setDate_begin(LocalDateTime.now());
        return routeRepository.save(route);
    }

    public Route addRoute(String startPoint, String restPoint, String endPoint, Integer duration, Integer distance, Integer price, MultipartFile img) throws IOException {
        Route route = new Route();
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
}
