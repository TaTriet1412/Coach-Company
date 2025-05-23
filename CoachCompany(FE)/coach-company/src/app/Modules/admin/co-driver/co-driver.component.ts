import { ElementRef, ViewChild, ViewEncapsulation ,ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../dto/user';
import { EmployeeService } from '../../../core/services/employee.service';
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
import { Subject } from 'rxjs';
import 'datatables.net' ;

@Component({
  selector: 'app-co-driver',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,MatSelectModule,MatPaginatorModule,DataTablesModule],
  templateUrl: './co-driver.component.html',
  styleUrl: './co-driver.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CoDriverComponent implements OnInit{
  createUrl = '/admin/co-driver/create-co-driver';
  updateUrl = '/admin/co-driver/update-co-driver';
  deleteUrl = 'users';
  pageType = 'co-driver';
  headerList = ['Mã nhân viên','Họ tên','Email','Số điện thoại','Ngày sinh','Vai trò','Giới tính','Hình ảnh','Trạng thái','Ngày cập nhật'];
  coDriverList!: User[];
  constructor(
    private router: Router,
    private http:HttpClient,
    private employeeService:EmployeeService,
    private cdr: ChangeDetectorRef
  ){}  

  ngOnInit(): void {
    this.employeeService.getUsers().subscribe(
      {
        next: (response:User[]) => {
          this.employeeService.setUserList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.coDriverList = this.employeeService.getCoDriverCurrent();
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
    $('#dataTableCoDriver').DataTable({
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
            const coDrivers = this.employeeService.getCoDriverCurrent().filter(coDriver => coDriver.id !== id);
            this.employeeService.setUserList(coDrivers);
            this.coDriverList = this.employeeService.getCoDriverCurrent();
            this.cdr.markForCheck();
        },
        error: (response:any) =>{
          console.error(response.error.message);
        }
      })
  }

  trackById(id: number, coDriver: User): number{
    return coDriver.id
  }
}
