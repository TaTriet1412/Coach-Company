import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Route } from '../../../dto/route';
import { RouteService } from '../../../../core/services/route.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BusService } from '../../../../core/services/bus.service';
import { Bus } from '../../../dto/bus';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../../dto/trip';
import { TripService } from '../../../../core/services/trip.service';
import { User } from '../../../dto/user';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-update-bus',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './update-bus.component.html',
  styleUrl: './update-bus.component.css'
})
export class UpdateBusComponent implements OnInit{
  busId!: number;
  constructor(
    private routeService:RouteService,
    private router:Router,
    private http:HttpClient,
    private snackBarService: SnackBarService,
    private busService:BusService,
    private activeRoute:ActivatedRoute,
  ){}

  busForm= new FormGroup({
    number_bus: new FormControl(''),
    routeId: new FormControl(0),
    enable: new FormControl(false),
  })


  handleUpdateBus(event:Event){
    event.preventDefault();
    const number_bus = this.busForm.get("number_bus")?.value?.trim()!;
    // const routeId = this.busForm.get("routeId")?.value!;
    const enable = this.busForm.get("enable")?.value!;
    // Thông báo warning
    if(number_bus==""){
      this.snackBarService.notifyWarning("Vui lòng nhập tên xe!");

    }else {
      this.busService.updateBus(this.busId,number_bus,enable)
        .subscribe({
          next: (response: Bus) => {
            this.snackBarService.notifySuccess("Thay đổi thành công");
            const updatedBuses = this.busService.getBusList().map(bus => bus.id === response.id ? response : bus );
            this.busService.setBusList(updatedBuses);
          },
          error: (response:any) => this.snackBarService.notifyError(response.error.message)
        })
    }
  }

  backList() {
    this.router.navigate(['admin/bus']);
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.busId = +params['id'];
      this.loadBus();
    })
  }

  loadBus(): void { 
    const bus = this.busService.getBusById(this.busId); 
    console.log(bus)
    this.busForm.patchValue(bus!); 
  }
}
