import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Route } from '../../../dto/route';
import { RouteService } from '../../../../core/services/route.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BusService } from '../../../../core/services/bus.service';
import { Bus } from '../../../dto/bus';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-create-bus',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatSelectModule, MatFormFieldModule,MatInputModule],
  templateUrl: './create-bus.component.html',
  styleUrl: './create-bus.component.css',
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateBusComponent implements OnInit{
  @ViewChild('routeSelect') routeSelect!: MatSelect;
  routeList!: Route[];
  filteredRoutesList: Route[] = [];
  constructor(
    private routeService:RouteService,
    private router:Router,
    private http:HttpClient,
    private snackBarService: SnackBarService,
    private busService:BusService,
    private cdr: ChangeDetectorRef,
    


  ){}

  busForm= new FormGroup({
    number_bus: new FormControl(''),
    route_id: new FormControl(0),
  })


  // Reload route when input
  filterRoutes(value: string) { 
    const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filterValue = normalizeText(value.toLowerCase()); 
    this.filteredRoutesList = this.routeList.filter(route => 
      normalizeText(route.start_point.toLowerCase()).includes(filterValue) || 
      normalizeText(route.end_point.toLowerCase()).includes(filterValue) 
    );
    this.cdr.detectChanges();

    this.busForm.get('route_id')?.setValue(0); 

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

  handleCreateBus(event:Event){
    event.preventDefault();
    const number_bus = this.busForm.get("number_bus")?.value?.trim()!;
    const route_id = this.busForm.get("route_id")?.value!;

     // Thông báo warning
     if(number_bus==""){
      this.snackBarService.notifyWarning("Vui lòng nhập tên xe!");
    
    }else if(route_id==0){
      this.snackBarService.notifyWarning("Vui lòng chọn tuyến xe!");

    }else {
      this.busService.addBus(number_bus,route_id)
        .subscribe({
          next: (response: Bus) => {
            console.log(response);
            this.snackBarService.notifySuccess("Tạo mới thành công");
            this.busService.setBusList([...this.busService.getBusList(),response]);
          },
          error: (response:any) => this.snackBarService.notifyError(response.error.message)
        })
    }
  }

  backList() {
    this.router.navigate(['admin/bus']);
  }

  ngOnInit(): void {
    this.routeService.getRoutes().subscribe(
      {
        next: (response:Route[]) => {
          this.routeService.setRoutes(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.routeList = this.routeService.getRoutesCurrent();
    this.filteredRoutesList = this.routeList;

  }

}
