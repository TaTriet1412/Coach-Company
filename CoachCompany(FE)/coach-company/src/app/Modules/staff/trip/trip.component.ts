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
import { firstValueFrom, Subject } from 'rxjs';
import 'datatables.net' ;
import { BusService } from '../../../core/services/bus.service';
import { Trip } from '../../dto/trip';
import { TripService } from '../../../core/services/trip.service';
import { EmployeeService } from '../../../core/services/employee.service';
@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,MatSelectModule,MatPaginatorModule,DataTablesModule],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.css'
})
export class TripComponent implements OnInit,AfterViewInit{
  createUrl = '/admin/trip/create-trip';
  updateUrl = '/admin/trip/update-trip';
  deleteUrl = 'trips';
  pageType = 'trip';
  headerList = ['Mã chuyến','Tên tuyến','Tài xế','Phụ lái','Số Xe'
    ,'Ngày đi','Thời gian bắt đầu','Thời gian kết thúc'
    ,'TT chạy','TT hoạt động','Ngày cập nhật'];
  tripList!: Trip[];
  constructor(
    public routeService:RouteService,
    public employeeService:EmployeeService,
    public busService:BusService,
    public tripService:TripService,
    public router: Router,
    public http:HttpClient,
    public cdr: ChangeDetectorRef
  ){}  
  
  async ngOnInit(): Promise<void> {
    const tripList = await firstValueFrom(this.tripService.getTrips());
    this.tripService.setTripList(tripList)
    this.tripList = this.tripService.getTripList();
    this.cdr.detectChanges
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
    await (this.ngOnInit())
    this.initializeDataTable();
  }

  initializeDataTable(): void {
    $('#dataTableTripStaff').DataTable({
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

  trackById(id: number, trip: Trip): number{
    return trip.id
  }

  getTripStatus(trip: any): string { 
    const now = new Date(); const timeStart = new Date(trip.time_start); 
    const timeEnd = new Date(trip.time_end); 
    if (now < timeStart) { 
      return 'Chưa chạy'; 
    } 
    else if (now >= timeStart && now <= timeEnd) { 
      return 'Đang chạy'; 
    } else { 
      return 'Đã chạy'; 
    } 
  }

  getTripStatusClass(trip: any): string {
    const now = new Date();
    const timeStart = new Date(trip.time_start);
    const timeEnd = new Date(trip.time_end);
  
    if (now < timeStart) {
      return 'not-started';
    } else if (now >= timeStart && now <= timeEnd) {
      return 'running';
    } else {
      return 'ended';
    }
  }
  
}
