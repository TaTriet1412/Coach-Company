package com.example.main.Repository;

import com.example.main.Entity.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository  extends JpaRepository<News,Long> {
}
