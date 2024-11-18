package com.example.main.Controller;

import com.example.main.Entity.News;
import com.example.main.Service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/newses")
@Controller
public class NewsController {
    @Autowired
    private NewsService newsService;

    @GetMapping
    public ResponseEntity<List<News>> getNewses(@RequestHeader Map<String,String> header){
        List<News> newsList = newsService.getNewses();
        return new ResponseEntity<>(newsList, HttpStatus.ACCEPTED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<News> getNewsById(@PathVariable Long id, @RequestHeader Map<String,String> header){
        News News = newsService.getNewsById(id);
        return new ResponseEntity<>(News, HttpStatus.ACCEPTED);
    }

    @PostMapping
    public ResponseEntity<News> addRoute(
            @RequestParam Long user_id,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String content,
            @RequestPart(required = false) MultipartFile img,
            @RequestHeader Map<String,String> header) throws IOException {
        News news = newsService.addNews(user_id,title,description,content,img);
        return new ResponseEntity<>(news,HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> removeNews(@PathVariable Long id, @RequestHeader Map<String,String> header){
        newsService.deleteNews(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PutMapping("/{newsId}")
    public ResponseEntity<News> updateNews(
            @PathVariable Long newsId,
            @RequestParam Long user_id,
            @RequestParam String title,
            @RequestParam String description,
            @RequestParam String content,
            @RequestParam boolean enable,
            @RequestPart(required = false) MultipartFile img,
            @RequestHeader Map<String,String> header) throws IOException {
        News news = newsService.updateNews(newsId,user_id,title,description,content,enable,img);
        return new ResponseEntity<>(news,HttpStatus.ACCEPTED);
    }
}
