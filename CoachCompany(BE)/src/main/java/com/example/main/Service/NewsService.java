package com.example.main.Service;

import com.example.main.Entity.News;
import com.example.main.Exception.FileException;
import com.example.main.FileHandle.FileChecker;
import com.example.main.Repository.NewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
        return newsRepository.save(news);
    }

}
