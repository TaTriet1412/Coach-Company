import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { News } from '../../../dto/news';
import { NewsService } from '../../../../core/services/news.service';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  public safeContent!: SafeHtml;

  constructor(
    private newsService: NewsService,
    private activeRoute: ActivatedRoute,
    private snackBarService: SnackBarService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit(): Promise<void> {
    this.activeRoute.params.subscribe((params) => {
      this.newsId = +params['id'];
      this.loadNews().then(() => {
        // Đảm bảo việc xử lý thẻ oembed xảy ra sau khi nội dung đã được render
        this.renderOembedToIframe();
      });
    });
  }

  async ngAfterViewInit(): Promise<void> {
    await this.ngOnInit();
    this.cdr.detectChanges();
  }

  private async loadNews(): Promise<void> {
    try {
      const newsResp = await firstValueFrom(this.newsService.getNewsByIdAPI(this.newsId));
      this.newsCurr = newsResp;

      // Log nội dung cho debug
      console.log('Nội dung gốc:', this.newsCurr.content);

      // Sanitize và lưu nội dung
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.newsCurr.content);

      // Yêu cầu Angular cập nhật lại view
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading news:', error);
      this.snackBarService.notifyError('Failed to load news.');
    }
  }

  private renderOembedToIframe(): void {
    const contentContainer = document.querySelector('.content-container');
    if (!contentContainer) return;
  
    const oembeds = contentContainer.querySelectorAll('oembed[url]');
    oembeds.forEach((oembed) => {
      let url = oembed.getAttribute('url');
      if (url) {
        // Chuyển đổi URL thành dạng nhúng
        const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\/\d+\/|\/v\/|youtu\.be\/|\/watch\?v=|\/watch\?.+&v=)([a-zA-Z0-9_-]{11})/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;
        if (videoId) {
          url = `https://www.youtube.com/embed/${videoId}`;
  
          const iframe = document.createElement('iframe');
          iframe.src = url;
          iframe.width = '560';
          iframe.height = '315';
          iframe.setAttribute('frameborder', '0');
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
          iframe.setAttribute('allowfullscreen', 'true');
  
          oembed.parentNode?.replaceChild(iframe, oembed);
        }
      }
    });
  }
  
}