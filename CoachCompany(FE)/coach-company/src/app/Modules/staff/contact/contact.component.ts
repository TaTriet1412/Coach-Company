import { ElementRef, ViewChild, ViewEncapsulation ,ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Contact } from '../../dto/contact';
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
import { ContactService } from '../../../core/services/contact.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { User } from '../../dto/user';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatIconModule,MatSelectModule,MatPaginatorModule,DataTablesModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ContactComponent implements OnInit{
  createUrl = '/staff/contact/create-contact';
  updateUrl = '/staff/contact/process-contact';
  deleteUrl = 'users';
  pageType = 'contact';
  headerList = ['Mã liên hệ','Tên khách hàng','Email',
    'Số điện thoại','Địa chỉ','Nghề nghiệp','Người phản hồi',
    'Thời gian phản hồi','Ngày tạo'];
  contactList!: Contact[];
  employeeList!: User[];
  constructor(
    private router: Router,
    private http:HttpClient,
    private contactService:ContactService,
    public employeeService:EmployeeService,
    private cdr: ChangeDetectorRef
  ){}  

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(
      {
        next: (response:Contact[]) => {
          this.contactService.setContactList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.contactList = this.contactService.getContactsList();

    this.employeeService.getUsers().subscribe(
      {
        next: (response:User[]) => {
          this.employeeService.setUserList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.employeeList = this.employeeService.getUserListCurrent();
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
    $('#dataTableContact').DataTable({
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
    // const headers = this.headers;
    // this.http.delete(`http://localhost:8080/api/${this.deleteUrl}/${id}`, {headers} )
    //   .subscribe({
    //     next: (response: any) => {
    //         const coDrivers = this.contactService.getCoDriverCurrent().filter(coDriver => coDriver.id !== id);
    //         this.contactService.setContactList(coDrivers);
    //         this.contactList = this.contactService.getCoDriverCurrent();
    //         this.cdr.markForCheck();
    //     },
    //     error: (response:any) =>{
    //       console.error(response.error.message);
    //     }
    //   })
  }

  trackById(id: number, contact: Contact): number{
    return contact.id
  }
}

