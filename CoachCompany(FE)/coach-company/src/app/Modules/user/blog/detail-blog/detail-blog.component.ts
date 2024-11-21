import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { News } from '../../../dto/news';
import { NewsService } from '../../../../core/services/news.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DetailBlogComponent implements OnInit, AfterViewInit {
  newsCurr!: News;
  newsId!: number;

  constructor(
    private newsService: NewsService,
    private activeRoute: ActivatedRoute,
    private snackBarService: SnackBarService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.newsId = +params['id'];
      this.loadNews();
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  private async loadNews(): Promise<void> {
    try {
      const newsResp = await firstValueFrom(this.newsService.getNewsByIdAPI(this.newsId));
      this.newsCurr = newsResp;
      this.cdr.detectChanges();
    } catch (error) {
      console.error(error);
      this.snackBarService.notifyError("Failed to load news.");
    }
  }
}
