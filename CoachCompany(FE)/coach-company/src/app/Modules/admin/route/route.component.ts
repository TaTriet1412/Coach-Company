import { Component, OnInit, ChangeDetectorRef, ElementRef , ViewChild, ViewEncapsulation, AfterViewInit  } from '@angular/core';
import { RouteService } from '../../../core/services/route.service';
import { Route } from '../../dto/route';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {ChangeDetectionStrategy} from '@angular/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatPaginatorModule  } from '@angular/material/paginator';
import { DataTablesModule} from "angular-datatables"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../dto/user';
import { firstValueFrom, Subject } from 'rxjs';
import 'datatables.net' ;
import { ShareModule } from '../../share/share.module';

@Component({
  selector: 'app-route',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, 
    MatIconModule,MatSelectModule,MatPaginatorModule,DataTablesModule,ShareModule],
  templateUrl: './route.component.html',
  styleUrl: './route.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  encapsulation: ViewEncapsulation.None,
})
export class RouteComponent implements OnInit, AfterViewInit {
  createUrl = '/admin/route/create-route';
  updateUrl = '/admin/route/update-route';
  deleteUrl = 'routes';
  pageType = 'route';
  headerList = ['Mã tuyến','Điểm bắt đầu','Các điểm dừng','Điểm kết thúc','Thời lượng','Khoảng cách','Hình ảnh','Trạng thái','Giá','Ngày cập nhật'];
  routeList!: Route[];
  constructor(
    private routeService:RouteService,
    private router: Router,
    private http:HttpClient,
    private cdr: ChangeDetectorRef
  ){}  
  
  async ngOnInit(): Promise<void> {
    const routeListCurr = await firstValueFrom(this.routeService.getRoutes())
    this.routeService.setRoutes(routeListCurr)
    this.routeList = this.routeService.getRoutesCurrent();
    await this.updateRoutesWithImages();
    this.cdr.detectChanges();
  }


  async updateRoutesWithImages(): Promise<void> { 
    const updatedRoutes = await Promise.all(this.routeList.map(async route => { 
      const currImg = await firstValueFrom(this.routeService.getRouteByIdAPI(route.id)); 
      return { ...route, img: currImg.img // Assuming `img` is the property that needs to be updated 
        };
      })); 
      this.routeList = updatedRoutes; 
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

  async ngAfterViewInit(): Promise<void> {
    await (this.ngOnInit());
    this.initializeDataTable();
    this.cdr.detectChanges();
  }

  initializeDataTable(): void {
    $('#dataTableRoute').DataTable({
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
    this.http.delete(`http://localhost:8080/api/${this.deleteUrl}/${id}`, {headers} )
      .subscribe({
        next: (response: any) => {
          if(this.pageType==="route"){
            const routes = this.routeService.getRoutesCurrent().filter(route => route.id !== id);
            this.routeService.setRoutes(routes);
            this.routeList = this.routeService.getRoutesCurrent();
            this.cdr.markForCheck();
          }
        },
        error: (response:any) =>{
          console.error(response.error.message);
        }
      })
  }

  trackById(id: number, route: Route): number{
    return route.id
  }

  trackByIdDriver(id: number, driver: User): number{
    return driver.id
  }
}
