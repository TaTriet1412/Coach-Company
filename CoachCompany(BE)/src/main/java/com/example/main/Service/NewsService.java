package com.example.main.Service;

import com.example.main.Entity.News;
import com.example.main.Exception.FileException;
import com.example.main.Exception.NewsException;
import com.example.main.FileHandle.FileChecker;
import com.example.main.Repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class NewsService {
    @Autowired
    private NewsRepository newsRepository;
    @Autowired
    private UserService userService;

    private final FileChecker fileChecker = new FileChecker();


    public List<News> getNewses() {
        return newsRepository.findAll();
    }

    public News getNewsById(Long id){
        return newsRepository.findById(id).orElseThrow(() -> new RuntimeException("News not found"));
    }

    public News addNews(Long userId,String title, String description, String content, MultipartFile img) throws IOException {
        final long MAX_CONTENT_SIZE = 10 * 1024 * 1024;
        // Kiểm tra kích thước content
        if (content.getBytes(StandardCharsets.UTF_8).length > MAX_CONTENT_SIZE) {
            throw new NewsException("File vượt quá 10MB.");
        }
        News news = new News();
        news.setUser(userService.getUserById(userId));
        news.setTitle(title);
        news.setDescription(description);
        news.setContent(content);
        if (img != null) {
            if(fileChecker.isImage(img)){
                news.setImg(img.getBytes());
            }else{
                throw new FileException("File không phải hình ảnh hoặc quá tải");
            }
        }
        return newsRepository.save(news);
    }

    public void deleteNews(Long id){
        newsRepository.deleteById(id);
    }

    public News updateNews(
            Long newsId,
            Long userId,
            String title,
            String description,
            String content,
            boolean enable,
            MultipartFile img
    ) throws IOException {
        final long MAX_CONTENT_SIZE = 10 * 1024 * 1024;
        // Kiểm tra kích thước content
        if (content.getBytes(StandardCharsets.UTF_8).length > MAX_CONTENT_SIZE) {
            throw new NewsException("File vượt quá 10MB.");
        }

        News news = getNewsById(newsId);
        news.setUser(userService.getUserById(userId));
        news.setTitle(title);
        news.setDescription(description);
        news.setContent(content);
        news.setEnable(enable);
        if (img != null) {
            if(fileChecker.isImage(img)){
                news.setImg(img.getBytes());
            }else{
                throw new FileException("File không phải hình ảnh hoặc quá tải");
            }
        }
        news.setDate_begin(LocalDateTime.now());
        return newsRepository.save(news);
    }

}
