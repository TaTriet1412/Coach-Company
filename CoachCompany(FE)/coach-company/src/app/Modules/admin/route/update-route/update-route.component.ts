import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { RouteService } from '../../../../core/services/route.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Route } from '../../../dto/route';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-route',
  templateUrl: './update-route.component.html',
  styleUrl: './update-route.component.css',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class UpdateRouteComponent implements OnInit {
  constructor(private snackBarService: SnackBarService,private routeService:RouteService,private router:Router,private activeRoute: ActivatedRoute) {}
  routeId!: number;
  
  routeForm= new FormGroup({
    id: new FormControl(0),
    start_point: new FormControl(''),
    rest_point: new FormControl(''),
    end_point: new FormControl(''),
    hours: new FormControl(0),
    minutes: new FormControl(0),
    distance: new FormControl(0),
    price: new FormControl(0),
    enable: new FormControl(true),
  })

  backList() {
    this.router.navigate(['admin/route']);
  }

  ngOnInit(): void {
      this.activeRoute.params.subscribe(params => {
        this.routeId = +params['id'];
        this.loadRoute();
      })
  }

  loadRoute(): void { 
    const route = this.routeService.getRouteById(this.routeId); 
    this.routeForm.patchValue(route!); 
    this.routeForm.get("hours")?.setValue(Math.floor(route?.duration!/3600))
    this.routeForm.get("minutes")?.setValue(Math.floor((route?.duration! - Math.floor(route?.duration!/3600)*3600)/60) )
  }

  
  handleUpdateRoute(event:Event){
    event.preventDefault();
    const start_point = this.routeForm.get("start_point")?.value?.trim()!;
    const rest_point = this.routeForm.get("rest_point")?.value?.trim()!;
    const end_point = this.routeForm.get("end_point")?.value?.trim()!;
    const hours = this.routeForm.get("hours")?.value!; 
    const minutes = this.routeForm.get("minutes")?.value!; 
    const distance = this.routeForm.get("distance")?.value!; 
    const price = this.routeForm.get("price")?.value!; 
    const enable = this.routeForm.get("enable")?.value!;
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
      this.routeService.updateRoute(this.routeId,start_point,rest_point,end_point,hours,minutes,distance,price,enable)
        .subscribe({
          next: (response: Route) => {
            this.snackBarService.notifySuccess("Thay đổi thành công");
            const updatedRoutes = this.routeService.getRoutesCurrent().map(route => route.id === response.id ? response : route );
            this.routeService.setRoutes(updatedRoutes);
          },
          error: (response:any) => this.snackBarService.notifyError(response.error.message)
        })
    }
    

  }
}
