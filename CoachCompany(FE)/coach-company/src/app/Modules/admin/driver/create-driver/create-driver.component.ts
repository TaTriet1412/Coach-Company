import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../../core/services/employee.service';
import { Router } from '@angular/router';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../dto/user';


@Component({
  selector: 'app-create-driver',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-driver.component.html',
  styleUrl: './create-driver.component.css'
})
export class CreateDriverComponent implements OnInit{
  selectedFile!: File ;
  today!: string;
  
  constructor(
    private snackBarService: SnackBarService,
    private employeeService:EmployeeService,
    private router:Router,
    private http:HttpClient,
  ) {}
  driverForm= new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    birthday: new FormControl(''),
    gender: new FormControl(true),
  })


  handleCreateDriver(event:Event){
    event.preventDefault();
    const name = this.driverForm.get("name")?.value?.trim()!;
    const email = this.driverForm.get("email")?.value?.trim()!;
    const phone = this.driverForm.get("phone")?.value?.trim()!;
    const birthday = this.driverForm.get("birthday")?.value!; 
    const gender = this.driverForm.get("gender")?.value!; 
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

      this.employeeService.addDriver(name,email,phone,birthday,gender)
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
    this.router.navigate(['admin/driver']);
  }

  ngOnInit(): void {
    const now = new Date(); 
    const month = ('0' + (now.getMonth() + 1)).slice(-2); 
    const day = ('0' + now.getDate()).slice(-2); 
    this.today = `${now.getFullYear()}-${month}-${day}`;
  }

}
