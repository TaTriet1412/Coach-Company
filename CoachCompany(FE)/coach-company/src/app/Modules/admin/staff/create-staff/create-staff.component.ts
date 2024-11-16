import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../dto/user';

@Component({
  selector: 'app-create-staff',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-staff.component.html',
  styleUrl: './create-staff.component.css'
})
export class CreateStaffComponent implements OnInit{
  today!: string;
  
  constructor(
    private snackBarService: SnackBarService,
    private employeeService:EmployeeService,
    private router:Router,
    private http:HttpClient,
  ) {}
  staffForm= new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    birthday: new FormControl(''),
    gender: new FormControl(true),
  })

  handleCreateStaff(event:Event){
    event.preventDefault();
    const name = this.staffForm.get("name")?.value?.trim()!;
    const email = this.staffForm.get("email")?.value?.trim()!;
    const phone = this.staffForm.get("phone")?.value?.trim()!;
    const birthday = this.staffForm.get("birthday")?.value!; 
    const gender = this.staffForm.get("gender")?.value!; 
    const emailPattern= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     // Thông báo warning
     if(name==""){
      this.snackBarService.notifyWarning("Vui lòng nhập họ tên!");
    
    }else if(email==""){
      this.snackBarService.notifyWarning("Vui lòng nhập email!");
    
    }else if(!emailPattern.test(email)){
      this.snackBarService.notifyWarning("Email không hợp lệ!");

    }else if(phone==""){
      this.snackBarService.notifyWarning("Vui lòng nhập số điện thoại!");

    }else if(birthday==""){
      this.snackBarService.notifyWarning("Vui lòng nhập ngày sinh!");

    }else {

      this.employeeService.addStaff(name,email,phone,birthday,gender)
        .subscribe({
          next: (response: User) => {
            this.snackBarService.notifySuccess("Tạo mới thành công");
            this.employeeService.setUserList([...this.employeeService.getUserListCurrent(),response]);
          },
          error: (response:any) => this.snackBarService.notifyError(response.error.message)
        })
    }
  }

  backList() {
    this.router.navigate(['admin/staff']);
  }

  ngOnInit(): void {
    const now = new Date(); 
    const month = ('0' + (now.getMonth() + 1)).slice(-2); 
    const day = ('0' + now.getDate()).slice(-2); 
    this.today = `${now.getFullYear()}-${month}-${day}`;
  }
}
