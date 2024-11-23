import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { News } from '../../dto/news';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';

@Component({
  standalone: true,
  imports: [CommonModule,DataTablesModule],
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent {
  createUrl = '/admin/news/create-news';
  updateUrl = '/admin/news/update-news';
  deleteUrl = '/admin/news/delete-news';
  pageType = 'news';
  headerList = ["Mã tin tức", "Tiêu đề", "Mô tả","Hình ảnh", "Trạng thái", "Ngày cập nhật"];
  newsList!: News[];
  constructor(
    private newService: NewsService,
    private router: Router,
    private http:HttpClient,
    private cdr: ChangeDetectorRef
  ){}  

  ngOnInit(): void {
    this.newService.getNewses().subscribe(
      {
        next: (response:News[]) => {
          this.newService.setnewsList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.newsList = this.newService.getNewsList();
  }

  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  @ViewChild('closeModalButton') closeModalButton!: ElementRef;

  dtTrigger: Subject<any> = new Subject<any>();

  
  // Store the DataTable options in a variable
  private dtOptions: any = {
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true,
    lengthMenu: [5, 10, 25, 50, 100],
    searching: true,
    language: {
      search: "Tìm kiếm:",
      searchPlaceholder: "Tìm kiếm",
      lengthMenu: "Hiển thị _MENU_ mục",
      info: "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
      infoEmpty: "Không có dữ liệu",
      paginate: {
        first: "Đầu",
        last: "Cuối",
        next: "Tiếp",
        previous: "Trước"
      },
      emptyTable: "Không có dữ liệu trong bảng"
    }
  };

  ngAfterViewInit(): void {
    this.initializeDataTable();
  }

  initializeDataTable(): void {
    $('#dataTableNews').DataTable({
      ...this.dtOptions,
      destroy: true 
    });

    this.dtTrigger.next(true);
  }

  createElement(){
    this.router.navigate([this.createUrl]);
  }

  updateElement(id: number){
      this.router.navigate([`${this.updateUrl}/${id}`]);
  }

  deleteElement(id: number){
    const headers = this.headers;
    this.newService.deleteNews(id)
      .subscribe({
        next: (response: any) => {
            const newses = this.newService.getNewsList().filter(news => news.id !== id);
            this.newService.setnewsList(newses);
            this.newsList = this.newService.getNewsList();
            this.cdr.markForCheck();
        },
        error: (response:any) =>{
          console.error(response.error.message);
        }
      })

  }

  trackById(id: number, news: News): number{
    return news.id
  }
}
