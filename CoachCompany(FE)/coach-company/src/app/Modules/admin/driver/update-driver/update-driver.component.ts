import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../dto/user';

@Component({
  selector: 'app-update-driver',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-driver.component.html',
  styleUrl: './update-driver.component.css'
})
export class UpdateDriverComponent implements OnInit, AfterViewInit{
  employeeId!: number;
  today!: string;
  selectedFile!: File;

  constructor(private snackBarService: SnackBarService,private employeeService:EmployeeService,private router:Router,private http:HttpClient,private activeRoute: ActivatedRoute) {}
  driverForm= new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    birthday: new FormControl(''),
    gender: new FormControl(true),
    enable: new FormControl(true)
  })

  handleUpdateDriver(event:Event){
    event.preventDefault();
    const name = this.driverForm.get("name")?.value?.trim()!;
    const email = this.driverForm.get("email")?.value?.trim()!;
    const phone = this.driverForm.get("phone")?.value?.trim()!;
    const birthday = this.driverForm.get("birthday")?.value!; 
    const gender = this.driverForm.get("gender")?.value!; 
    const enable = this.driverForm.get("enable")?.value!;
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
      this.employeeService.updateCoDriver(this.employeeId,name,email,phone,birthday,gender,enable,this.selectedFile)
        .subscribe({
          next: (response: User) => {
            this.snackBarService.notifySuccess("Thay đổi thành công");
            const updatedUserList = this.employeeService.getUserListCurrent().map(user => user.id === response.id ? response : user );
            this.employeeService.setUserList(updatedUserList);
            
          },
          error: (response:any) => this.snackBarService.notifyError(response.error.message)
        })
    }

  }

  onFileSelected(event: any) { 
    this.selectedFile = event.target.files[0]; 
  }


  backList() {
    this.router.navigate(['admin/driver']);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.employeeId = +params['id'];
      this.loadDriver();
    })
  }
  
  ngAfterViewInit(): void {
    const now = new Date(); 
    const month = ('0' + (now.getMonth() + 1)).slice(-2); 
    const day = ('0' + now.getDate()).slice(-2); 
    this.today = `${now.getFullYear()}-${month}-${day}`;
    
  }

  loadDriver(): void { 
    const driver = this.employeeService.getDriverById(this.employeeId); 
    this.driverForm.patchValue(driver!); 
  }
}
