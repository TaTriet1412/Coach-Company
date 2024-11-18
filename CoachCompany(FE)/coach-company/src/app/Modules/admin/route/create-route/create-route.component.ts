import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouteService } from '../../../../core/services/route.service';
import { Route } from '../../../dto/route';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrl: './create-route.component.css',
  standalone: true,
  imports: [ReactiveFormsModule],

})
export class CreateRouteComponent{
  constructor(
    private snackBarService: SnackBarService,
    private routeService:RouteService,
    private router:Router,
  ) {}

  selectedFile!: File;

  routeForm= new FormGroup({
    start_point: new FormControl(''),
    rest_point: new FormControl(''),
    end_point: new FormControl(''),
    hours: new FormControl(0),
    minutes: new FormControl(0),
    distance: new FormControl(0),
    price: new FormControl(0),
  })

  onFileSelected(event: any) { 
    this.selectedFile = event.target.files[0]; 
  }


  backList() {
    this.router.navigate(['admin/route']);
  }

  handleCreateRoute(event:Event){
    event.preventDefault();
    const start_point = this.routeForm.get("start_point")?.value?.trim()!;
    const rest_point = this.routeForm.get("rest_point")?.value?.trim()!;
    const end_point = this.routeForm.get("end_point")?.value?.trim()!;
    const hours = this.routeForm.get("hours")?.value!; 
    const minutes = this.routeForm.get("minutes")?.value!; 
    const distance = this.routeForm.get("distance")?.value!; 
    const price = this.routeForm.get("price")?.value!; 
    
    // Thông báo warning
    if(start_point==""){
      this.snackBarService.notifyWarning("Vui lòng nhập điểm bắt đầu!");
    
    }else if(end_point==""){
      this.snackBarService.notifyWarning("Vui lòng nhập điểm kết thúc!");
    
    }else if(hours<0 || hours>23 ){
      this.snackBarService.notifyWarning("Giờ không đúng thực tế!");

    }else if(minutes<0 || minutes>59 ){
      this.snackBarService.notifyWarning("Phút không đúng thực tế!");

    }else if(distance<0){
      this.snackBarService.notifyWarning("Giá trị quãng đường không đúng thực tế!");

    }else if(price<0){
      this.snackBarService.notifyWarning("Giá trị tiền tệ không đúng thực tế!");
    
    }else { // Thông bảo lỗi và thành công
      this.routeService.addRoute(start_point,rest_point,end_point,hours,minutes,distance,price,this.selectedFile)
        .subscribe({
          next: (response: Route) => {
            this.snackBarService.notifySuccess("Tạo mới thành công");
            this.routeService.setRoutes([...this.routeService.getRoutesCurrent(),response]);
          },
          error: (response:any) => this.snackBarService.notifyError(response.error.message)
        })
    }
  }
}
