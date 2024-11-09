import { Component } from '@angular/core';
import { NEWS } from '../../dto/news';
import { LayoutCrudComponent } from '../layout-crud/layout-crud.component';

@Component({
  standalone: true,
  imports: [LayoutCrudComponent],
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  createUrl = '/admin/news/create-news';
  updateUrl = '/admin/news/update-news';
  deleteUrl = '/admin/news/delete-news';
  pageType = 'news';
  headerList = ["Mã tin tức","STT", "Tiêu đề", "Hình", "Meta", "Hiển thị", "Ngày cập nhật"];
  newsList = NEWS;
}
