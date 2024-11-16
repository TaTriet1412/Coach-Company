import { ElementRef, ViewChild, ViewEncapsulation ,ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { Bus } from '../../dto/bus';
import { HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import 'datatables.net' ;
import { BusService } from '../../../core/services/bus.service';
import { RouteService } from '../../../core/services/route.service';

@Component({
  selector: 'app-bus',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,MatSelectModule,MatPaginatorModule,DataTablesModule],
  templateUrl: './bus.component.html',
  styleUrl: './bus.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  encapsulation: ViewEncapsulation.None,
})
export class BusComponent {
  createUrl = '/admin/bus/create-bus';
  updateUrl = '/admin/bus/update-bus';
  deleteUrl = 'buses';
  pageType = 'bus';
  headerList = ['Mã xe','Tuyến xe','Số xe','Trạng thái','Ngày tạo'];
  busList!: Bus[];
  constructor(
    private router: Router,
    private busService:BusService,
    public routeService:RouteService,
  ){}  

  ngOnInit(): void {
    this.busService.getBuses().subscribe(
      {
        next: (response:Bus[]) => {
          this.busService.setBusList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.busList = this.busService.getBusList();
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
    $('#dataTableBus').DataTable({
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


  trackById(id: number, bus: Bus): number{
    return bus.id
  }
}
