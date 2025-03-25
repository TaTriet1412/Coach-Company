import { FormsModule } from '@angular/forms';
import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component,ElementRef, LOCALE_ID, OnInit} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { Router } from '@angular/router';
import { SearchScheduleComponent } from "../search-schedule/search-schedule.component";
import { RouteService } from '../../../core/services/route.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { Route } from '../../dto/route';
import { Trip } from '../../dto/trip';
import { TripService } from '../../../core/services/trip.service';
import { BusService } from '../../../core/services/bus.service';
import { Bus } from '../../dto/bus';
import { CommonModule } from '@angular/common';
import { response } from 'express';
import { Seat } from '../../dto/seat';
import { ShareModule } from '../../share/share.module';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'user-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  standalone: true,
  imports: [CommonModule,ShareModule,FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, SearchScheduleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleComponent  implements OnInit, AfterViewInit{
  datePicker!: ElementRef;
  selectedDate!: Date;
  currPage = 'schedule';
  routeList!: Route[];
  routeCurr: Route | undefined;
  tripList!: Trip[];
  busList!: Bus[];
  occupiedSeats: { [tripId: number]: number } = {};
  startPoint!: string;
  endPoint!: string;

  constructor(
    private router: Router,
    public routeService:RouteService,
    public busService: BusService,
    public tripService: TripService,
    private snackBarService: SnackBarService,
    private cdr: ChangeDetectorRef,
  ){}

  goToChooseChair(tripId: number){
    this.router.navigate([`/user/choose-chair/${tripId}`])
  }

  async ngOnInit(): Promise<void> {
      // Load RouteList
    const routeList = await firstValueFrom(this.routeService.getRoutes())
    this.routeService.setRoutes(routeList)
    this.routeList = this.routeService.getRoutesCurrent();
    this.cdr.detectChanges()
  }

  async ngAfterViewInit(): Promise<void> {
    await (this.ngOnInit());
    this.cdr.detectChanges();
  }

  async onScheduleSearch(): Promise<void> {
    // Lay route can tim
    this.routeCurr = this.routeList.find(route => 
      (route.start_point == localStorage.getItem('start_point')) &&
      (route.end_point == localStorage.getItem('end_point')) &&
      route.enable
    )
    this.startPoint = localStorage.getItem('start_point')!;
    this.endPoint = localStorage.getItem('end_point')!;
    const date = new Date(JSON.parse(localStorage.getItem('date_choose')!)!)
    let currMonth: number | string = (date.getMonth()+1);
    let currDate: number | string = date.getDate();
    if(currMonth < 10){
      currMonth = '0' + currMonth.toString();
    }
    if(currDate < 10) {
      currDate = '0' + currDate.toString();
    }

    const dayString = date.getFullYear() + "-" + currMonth + "-" + currDate;

    
    if(this.routeCurr!= undefined) {
      const busListCurr = await firstValueFrom(this.busService.getBuses())
      this.busService.setBusList(busListCurr);
      this.busList = this.busService.getBusList();
      
      const tripListCurr = await firstValueFrom(this.tripService.getTrips());
      this.tripService.setTripList(tripListCurr);
      
      // filter trip list
      this.tripList = this.tripService.getTripList().filter(trip => 
        (trip.enable) 
        && this.busService.getBusById(trip.busId)?.routeId == this.routeCurr?.id
        && dayString == trip.time_start.substring(0,10)
        && new Date() < new Date(trip.time_start)
      );

      // this.tripService.getTripList().forEach(trip => {
      //   console.log(trip.time_start)
      //   console.log(this.busService.getBusById(trip.busId)?.routeId == this.routeCurr?.id)
      //   console.log( dayString == trip.time_start.substring(0,10))
      //   console.log( new Date() < new Date(trip.time_start))
      // })

      for (const trip of this.tripList) {
         this.occupiedSeats[trip.id] = await this.numberOfSeatsOccupiedOfTripId(trip.id);
      }
      this.cdr.detectChanges()
    }else {
      this.snackBarService.notifyWarningUser("Không có các chuyến theo lựa chọn của quý khách")
      this.busList = []
      this.tripList = []
      this.occupiedSeats = []
      this.cdr.detectChanges()
    }

  }

  convertSecondsToHours(seconds: number): string {
    const hours = seconds / 3600;
    return hours.toFixed(1);  // Làm tròn một chữ số thập phân
  }

  async numberOfSeatsOccupiedOfTripId(tripId: number): Promise<number> {
    const seatListIsOccupied = await firstValueFrom (this.tripService.getSeatsIsOccupiedByTripId(tripId))
    return seatListIsOccupied ? seatListIsOccupied.length : 0;    
  }
}
