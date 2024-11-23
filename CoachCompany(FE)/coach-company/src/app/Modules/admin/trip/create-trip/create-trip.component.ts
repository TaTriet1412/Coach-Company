import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouteService } from '../../../../core/services/route.service';
import { Route } from '../../../dto/route';
import { Router } from '@angular/router';
import { Trip } from '../../../dto/trip';
import { Bus } from '../../../dto/bus';
import { BusService } from '../../../../core/services/bus.service';
import { TripService } from '../../../../core/services/trip.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../dto/user';
import { EmployeeService } from '../../../../core/services/employee.service';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatSelectModule, MatFormFieldModule,MatInputModule],
  templateUrl: './create-trip.component.html',
  styleUrl: './create-trip.component.css',
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTripComponent implements OnInit{
  @ViewChild('timeStart', { static: true }) timeStart!: ElementRef;
  @ViewChild('routeSelect') routeSelect!: MatSelect;
  @ViewChild('busSelect') busSelect!: MatSelect;
  @ViewChild('driverSelect') driverSelect!: MatSelect;
  @ViewChild('coDriverSelect') coDriverSelect!: MatSelect;
  today!: string;
  tripList!: Trip[];
  busList!: Bus[];
  routeList!: Route[];
  driverList!: User[];
  coDriverList!: User[];
  // Array after input
  filteredRoutesList: Route[] = [];
  filteredBusList: Bus[] = [];
  filteredDriverList: User[] = [];
  filteredCoDriverList: User[] = [];

  constructor(
    private snackBarService: SnackBarService,
    private routeService:RouteService,
    private busService:BusService,
    private tripService:TripService,
    private employeeService:EmployeeService,
    private router:Router,
    private cdr: ChangeDetectorRef,
  ) {}
  tripForm= new FormGroup({
    route_id: new FormControl(''),
    bus_id: new FormControl(''),
    driver_id: new FormControl(''),
    co_driver_id: new FormControl(''),
    dateStart: new FormControl(''),
    time_start: new FormControl(''),
    time_end: new FormControl(''),
  })

  ngOnInit(): void {
    // Today
    const now = new Date(); 
    const month = ('0' + (now.getMonth() + 1)).slice(-2); 
    const day = ('0' + now.getDate()).slice(-2); 
    this.today = `${now.getFullYear()}-${month}-${day}`;

    // Load RouteList
    this.routeService.getRoutes().subscribe(
      {
        next: (response:Route[]) => {
          // const routeActiveList = response.filter(route => route.enable==true);
          this.routeService.setRoutes(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.routeList = this.routeService.getRoutesCurrent();
    this.filteredRoutesList = this.routeList.filter(route =>route.enable==true);

    // Load busList khi da chon tuyen
    this.tripForm.get('route_id')?.valueChanges
      .subscribe(value => {
        this.busService.getBuses().subscribe(
          {
            next: (response:Bus[]) => {
              // const busActiveList = response.filter(bus => bus.enable == true)
              this.busService.setBusList(response)
            },
            error: (response: any) => console.log(response.error)
          }
        );
        this.busList = this.busService.getBusListFromRouteId(Number(value));
        this.filteredBusList = this.busList.filter(bus => bus.enable == true);
      })

    // Load tai xe
    this.employeeService.getUsers().subscribe(
      {
        next: (response:User[]) => {
          // const employeeActiveList = response.filter(employee=>employee.enable==true)
          this.employeeService.setUserList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.driverList = this.employeeService.getDriverCurrent();
    this.filteredDriverList = this.driverList.filter(employee=>employee.enable==true);
    //Load phu lai
    this.employeeService.getUsers().subscribe(
      {
        next: (response:User[]) => {
          // const employeeActiveList = response.filter(employee=>employee.enable==true)
          this.employeeService.setUserList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.coDriverList = this.employeeService.getCoDriverCurrent();
    this.filteredCoDriverList = this.coDriverList.filter(employee=>employee.enable==true);


    
    //Xu li gio ket thuc
    this.tripForm.get('route_id')?.valueChanges
      .subscribe(value => {
        const route_id = this.tripForm.get("route_id")?.value?.trim()!;
        this.tripForm.get('time_start')?.valueChanges
          .subscribe(value => {
            const timeSeconds = this.routeService.getRouteById(Number(route_id))!?.duration;
            this.updateEndTime(value!,timeSeconds)
          });
      })
    this.tripForm.get('time_start')!?.valueChanges
      .subscribe(valueTime => {
        this.tripForm.get('route_id')?.valueChanges
        .subscribe(value => {
            const timeSeconds = this.routeService.getRouteById(Number(value))!?.duration;
            this.updateEndTime(valueTime!,timeSeconds)
          });
      })
  }

  backList() {
    this.router.navigate(['admin/trip']);
  }


  handleCreateTrip(event:Event){
    event.preventDefault();
    const route_id = this.tripForm.get("route_id")?.value?.trim()!;
    const bus_id = this.tripForm.get("bus_id")?.value?.trim()!;
    const driver_id = this.tripForm.get("driver_id")?.value?.trim()!;
    const co_driver_id = this.tripForm.get("co_driver_id")?.value?.trim()!; 
    const dateStart = this.tripForm.get("dateStart")?.value!.trim()!; 
    const time_start = this.tripForm.get("time_start")?.value!.trim()!; 
    const time_end = this.tripForm.get("time_end")?.value!.trim()!; 
    // Kiểm tra thời gian bắt đầu
    const now = new Date(); 
    const selectedDate = new Date(dateStart+"T"+time_start); 
    const nowTime = now.getHours() * 60 + now.getMinutes(); 
    const selectedDateTime = selectedDate.getHours() * 60 + selectedDate.getMinutes();
    // Thông báo warning
    if(route_id==""){
      this.snackBarService.notifyWarning("Vui lòng chọn tuyến!");
    
    }else if(bus_id==""){
      this.snackBarService.notifyWarning("Vui lòng chọn xe!");
    
    }else if(driver_id==""){
      this.snackBarService.notifyWarning("Vui lòng chọn tài xế!");

    }else if(co_driver_id==""){
      this.snackBarService.notifyWarning("Vui lòng chọn phụ lái!");

    }else if(dateStart==""){
      this.snackBarService.notifyWarning("Vui lòng nhâp ngày bắt đầu!");

    }else if(time_start==""){
      this.snackBarService.notifyWarning("Vui lòng chọn giờ bắt đầu!");
    
    }else if (selectedDate.toDateString() === now.toDateString() && selectedDateTime<nowTime){  
        this.snackBarService.notifyWarning("Giờ bắt đầu không hợp lệ!");

    }else if(time_end==""){
      this.snackBarService.notifyWarning("Vui lòng nhập giờ bắt đầu và tuyến (để HT tự tạo giờ)!");
  
    }
    else { // Thông bảo lỗi và thành công
      const duration = this.routeService.getRouteById(Number(route_id))!?.duration;
      this.tripService.addTrip(Number(bus_id),Number(driver_id),Number(co_driver_id),dateStart,time_start,duration)
        .subscribe({
          next: (response: Trip) => {
            this.snackBarService.notifySuccess("Tạo mới thành công");
            this.tripService.setTripList([...this.tripService.getTripList(),response]);
          },
          error: (response:any) => this.snackBarService.notifyError(response.error.message)
        })
    }
  }

  updateEndTime(startTime: string,additionalSeconds: number) { 
    const [hours, minutes] = startTime.split(':').map(Number); 
    const startDate = new Date(); 
    startDate.setHours(hours, minutes, 0, 0); 
    const endDate = new Date(startDate.getTime() + additionalSeconds * 1000); 
    const endHours = ('0' + endDate.getHours()).slice(-2); 
    const endMinutes = ('0' + endDate.getMinutes()).slice(-2); 
    const endTime = `${endHours}:${endMinutes}`; 
    this.tripForm.get('time_end')!.setValue(endTime)
  }

  // Reload route when input
  filterRoutes(value: string) { 
    const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filterValue = normalizeText(value.toLowerCase()); 
    this.filteredRoutesList = this.routeList.filter(route => 
      (normalizeText(route.start_point.toLowerCase()).includes(filterValue) || 
      normalizeText(route.end_point.toLowerCase()).includes(filterValue) ) && route.enable == true
    );
    this.cdr.detectChanges();

    this.tripForm.get('route_id')?.setValue(""); 
    this.tripForm.get('bus_id')?.setValue(""); 

    // Open the dropdown if there are filtered routes if 
    if (this.filteredRoutesList.length > 0) { 
      this.routeSelect.open(); 
    };
  }

  onRouteSearch(event: Event) { 
    const input = event.target as HTMLInputElement; 
    if (input) { 
      const value = input.value; 
      this.filterRoutes(value); 
    }
  }

  removeBusId(){
    this.tripForm.get('bus_id')?.setValue("");
  }

  // Reload route when input
  filterBuses(value: string) { 
    const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filterValue = normalizeText(value.toLowerCase()); 
    this.filteredBusList = this.busList.filter(bus => 
      normalizeText(bus.number_bus.toLowerCase()).includes(filterValue) && bus.enable==true
    );
    this.cdr.detectChanges();

    this.tripForm.get('bus_id')?.setValue(""); 

    // Open the dropdown if there are filtered routes if 
    if (this.filteredBusList.length > 0) { 
      this.busSelect.open(); 
    };
  }

  onBusSearch(event: Event) { 
    const input = event.target as HTMLInputElement; 
    if (input) { 
      const value = input.value; 
      this.filterBuses(value); 
    }
  }

  // Reload route when input
  filterDrivers(value: string) { 
    const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filterValue = normalizeText(value.toLowerCase()); 
    this.filteredDriverList = this.driverList.filter(driver => 
      normalizeText(driver.name.toLowerCase()).includes(filterValue) && driver.enable==true
    );
    this.cdr.detectChanges();

    this.tripForm.get('driver_id')?.setValue(""); 

    // Open the dropdown if there are filtered routes if 
    if (this.filteredDriverList.length > 0) { 
      this.driverSelect.open(); 
    };
  }

  onDriverSearch(event: Event) { 
    const input = event.target as HTMLInputElement; 
    if (input) { 
      const value = input.value; 
      this.filterDrivers(value); 
    }
  }

  // Reload route when input
  filterCoDrivers(value: string) { 
    const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filterValue = normalizeText(value.toLowerCase()); 
    this.filteredCoDriverList = this.coDriverList.filter(coDriver => 
      normalizeText(coDriver.name.toLowerCase()).includes(filterValue) && coDriver.enable==true
    );
    this.cdr.detectChanges();

    this.tripForm.get('co_driver_id')?.setValue(""); 

    // Open the dropdown if there are filtered routes if 
    if (this.filteredCoDriverList.length > 0) { 
      this.coDriverSelect.open(); 
    };
  }

  onCoDriverSearch(event: Event) { 
    const input = event.target as HTMLInputElement; 
    if (input) { 
      const value = input.value; 
      this.filterCoDrivers(value); 
    }
  }
}
