import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { Ticket } from '../../dto/ticket';
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
import { News } from '../../dto/news';
import { Route } from '../../dto/route';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RouteService } from '../../../core/services/route.service';
import { User } from '../../dto/user';
import { EmployeeService } from '../../../core/services/employee.service';
import { Subject } from 'rxjs';
import 'datatables.net' ;

@Component({
  selector: 'app-layout-crud',
  templateUrl: './layout-crud.component.html',
  styleUrl: './layout-crud.component.css',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,MatSelectModule,MatPaginatorModule,DataTablesModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutCrudComponent implements AfterViewInit{
  @Input('createUrl') createUrl!: String;
  @Input('updateUrl') updateUrl!: String;
  @Input('deleteUrl') deleteUrl!: String;
  @Input('pageType') pageType!: String;
  @Input('headerList') headerList!: String[];
  @Input('ticketList') ticketList!: Ticket[];
  @Input('newsList') newsList!: News[];
  @Input('routeList') routeList!: Route[];
  @Input('driverList') driverList!: User[];
  constructor(
    private router: Router,
    private http:HttpClient,
    private routeService:RouteService,
    private employeeServie:EmployeeService,
    private cdr: ChangeDetectorRef
  ){}
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
    $('#dataTable').DataTable({
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
          // Xóa Route
          if(this.pageType==="route"){
            const routes = this.routeService.getRoutesCurrent().filter(route => route.id !== id);
            this.routeService.setRoutes(routes);
            this.routeList = this.routeService.getRoutesCurrent();
            this.cdr.markForCheck();
          }else if (this.pageType==="driver"){
            const drivers = this.employeeServie.getDriverCurrent().filter(route => route.id !== id);
            this.employeeServie.setUserList(drivers);
            this.driverList = this.employeeServie.getDriverCurrent();
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
