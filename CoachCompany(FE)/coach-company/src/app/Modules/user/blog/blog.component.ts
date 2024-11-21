import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { News } from '../../dto/news';
import { NewsService } from '../../../core/services/news.service';
import { ShareModule } from '../../share/share.module';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
  standalone: true,
  imports: [CommonModule,ShareModule]
})
export class BlogComponent implements OnInit,AfterViewInit {
  newsList!: News[];
  newsOfWeeks!: News[];
  constructor(
    private newsService: NewsService,
    private cdr:ChangeDetectorRef,
    private router:Router,
  ){}


  async ngOnInit(): Promise<void> {
    await this.loadNewsList();
  }

  async loadNewsList(): Promise<void>{
    const newsListAPI = await firstValueFrom( this.newsService.getNewses())
    this.newsService.setnewsList(newsListAPI)
    this.newsList = this.newsService.getNewsList();
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();
    this.filterNewsByCurrentWeek();
    this.cdr.detectChanges();
  }

  private filterNewsByCurrentWeek(): void {
    const currentWeekNews = this.newsList.filter(news => {
      const newsDate = new Date(news.date_begin); // Assuming `news.date` is a valid date string
      const now = new Date();
      
      // Calculate the start and end of the current week
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Set to Monday
      const endOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 7));  // Set to Sunday
      
      // Normalize dates to remove time part
      startOfWeek.setHours(0, 0, 0, 0);
      endOfWeek.setHours(23, 59, 59, 999);
      
      return newsDate >= startOfWeek && newsDate <= endOfWeek;
    });

    this.newsOfWeeks = currentWeekNews;
  }

  goToDetailPage(id:number){
    this.router.navigate([`user/blog/detail-blog/${id}`]);
  }
}
