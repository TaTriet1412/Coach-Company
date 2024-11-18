import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { EmployeeService } from '../../../../core/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../dto/user';

@Component({
  selector: 'app-update-co-driver',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-co-driver.component.html',
  styleUrl: './update-co-driver.component.css'
})
export class UpdateCoDriverComponent implements OnInit, AfterViewInit{
  employeeId!: number;
  today!: string;
  selectedFile!: File;

  constructor(private snackBarService: SnackBarService,private employeeService:EmployeeService,private router:Router,private http:HttpClient,private activeRoute: ActivatedRoute) {}
  coDriverForm= new FormGroup({
    id: new FormControl(0),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    birthday: new FormControl(''),
    gender: new FormControl(true),
    enable: new FormControl(true)
  })

  handleUpdateCoDriver(event:Event){
    event.preventDefault();
    const name = this.coDriverForm.get("name")?.value?.trim()!;
    const email = this.coDriverForm.get("email")?.value?.trim()!;
    const phone = this.coDriverForm.get("phone")?.value?.trim()!;
    const birthday = this.coDriverForm.get("birthday")?.value!; 
    const gender = this.coDriverForm.get("gender")?.value!; 
    const enable = this.coDriverForm.get("enable")?.value!;
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

      this.employeeService.updateDriver(this.employeeId,name,email,phone,birthday,gender,enable,this.selectedFile)
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
      this.loadCoDriver();
    })

  }
  
  ngAfterViewInit(): void {
    const now = new Date(); 
    const month = ('0' + (now.getMonth() + 1)).slice(-2); 
    const day = ('0' + now.getDate()).slice(-2); 
    this.today = `${now.getFullYear()}-${month}-${day}`;
    
  }

  

  loadCoDriver(): void { 
    const driver = this.employeeService.getCoDriverById(this.employeeId); 
    this.coDriverForm.patchValue(driver!); 
  }
}
