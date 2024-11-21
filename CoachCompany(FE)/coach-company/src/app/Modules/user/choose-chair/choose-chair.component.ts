import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TripService } from '../../../core/services/trip.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { Seat } from '../../dto/seat';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Trip } from '../../dto/trip';
import { Route } from '../../dto/route';
import { CommonModule } from '@angular/common';
import { SeatService } from '../../../core/services/seat.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../dto/ticket';
import { RouteService } from '../../../core/services/route.service';
import { ShareModule } from '../../share/share.module';

@Component({
  selector: 'app-choose-chair',
  templateUrl: './choose-chair.component.html',
  styleUrl: './choose-chair.component.css',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ShareModule]
})
export class ChooseChairComponent implements OnInit,AfterViewInit {
  seatList!: Seat[];
  tripId!: number;
  tripCurr!: Trip;
  seatChunks: any[][] = [];
  seatIsOccupiedList!: Seat[];
  seatStatuses: { [seatId: number]: string } = {};
  seatNameList: string[] = [];
  maxActiveSeats: number = 5;
  route!: Route;

  tripForm= new FormGroup({
    name: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  })

  constructor(
    private tripService:TripService,
    public routeService: RouteService,
    private seatService: SeatService,
    private ticketService: TicketService,
    private snackBarService: SnackBarService,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ){}

  async ngOnInit(): Promise<void> {
    (this.activeRoute.params.subscribe(params => {
      this.tripId = +params['id'];
    }))
    this.loadRouteByTripId(this.tripId);
    const seatListCurr = await firstValueFrom( this.tripService.getSeatsByTripId(this.tripId))
    this.seatService.setSeatList(seatListCurr)
    this.seatList = this.seatService.getSeatList()
    this.seatChunks = this.chunkArray(this.seatList, 3);
    
    // list of seats is occupied
    const seatIsOccupiedListCurr = await firstValueFrom(this.tripService.getSeatsIsOccupiedByTripId(this.tripId))
    this.seatIsOccupiedList = seatIsOccupiedListCurr;
    
    // list status of seats
    this.seatList.forEach(seat => { this.seatStatuses[seat.id] = this.isOccupiedSeat(seat.id) ? 'sold' : 'available'; });
    


    const tripCurrAPI = await firstValueFrom( this.tripService.getTripByIdAPI(this.tripId))
    this.tripCurr = tripCurrAPI;
    this.cdr.detectChanges();
  }

  async ngAfterViewInit(): Promise<void> {
    await (this.ngOnInit());
  }

  chunkArray(myArray: any[], chunk_size: number): any[][] {
    const results = [];
    const arrayCopy = [...myArray]; // Create a copy of the original array
    while (arrayCopy.length) {
      results.push(arrayCopy.splice(0, chunk_size));
    }
    return results;
  }
  

  isOccupiedSeat(seatId: number): boolean{
    if(this.seatIsOccupiedList) {
      return this.seatIsOccupiedList.some(seat => seat.id == seatId);
    }
    return false
  }

  // Chose chair

  getActiveSeatsCount(): number { 
    return Object.values(this.seatStatuses).filter(status => status === 'active').length; 
  }


  toggleSeatStatus(seatId: number): void { 
    if (this.seatStatuses[seatId] === 'sold') { 
      return; // Do nothing if the seat is sold 
    } 
    console.log(this.seatStatuses)
    const activeSeatsCount = this.getActiveSeatsCount(); 
    if (this.seatStatuses[seatId] === 'available' && activeSeatsCount < this.maxActiveSeats) {
      this.seatStatuses[seatId] = 'active';
      const seatName = this.seatService.getSeatById(seatId)?.name!; 
      this.seatNameList.push(seatName);
    } else if (this.seatStatuses[seatId] === 'active') { 
      this.seatStatuses[seatId] = 'available'; 
      const seatName = this.seatService.getSeatById(seatId)?.name!; 
      this.seatNameList = this.seatNameList.filter(name => name !== seatName);
    } 
    this.cdr.detectChanges();

    // notify when choose > 5 seats
    if(activeSeatsCount == 5) {
      this.snackBarService.notifyWarningUser('Đã chọn đủ số ghế')
    }
  }

  // Xu li dat ve
  getActiveSeatKeys(): number[] {
    return Object.keys(this.seatStatuses)
      .filter(key => this.seatStatuses[+key] === 'active')
      .map(key => +key); // Convert keys to numbers
  }
  

  handleBookTicket(event:Event){
    event.preventDefault()
    const name = this.tripForm.get("name")?.value?.trim()!;
    const phone = this.tripForm.get("phone")?.value?.trim()!;
    const email = this.tripForm.get("email")?.value?.trim()!;
    const emailPattern= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const seatActive = this.getActiveSeatKeys();

    if(seatActive.length == 0) {
      this.snackBarService.notifyWarningUser("Chọn tối thiểu một ghế!");

    }else if(name==""){
      this.snackBarService.notifyWarningUser("Vui lòng nhập tên!");
    
    }else if(phone==""){
      this.snackBarService.notifyWarningUser("Vui lòng nhập số điện thoại!");

    }else if(email==""){
      this.snackBarService.notifyWarningUser("Vui lòng nhập email!");
    
    }else if(!emailPattern.test(email)){
      this.snackBarService.notifyWarning("Email không hợp lệ");
    
    }else {
      // Dat ve cho khach hang
      this.ticketService.addTicket(this.tripId,name,phone,email,seatActive)
        .subscribe({
          next: (response: Ticket) => {
            this.snackBarService.notifySuccessUser("Đặt vé thành công")
            this.router.navigate([`ticket/detail-ticket/${response.id}`])
          }
        })
      
    }
  }

  async loadRouteByTripId(tripId: number): Promise<void> { this.route = await this.getRouteByTripId(tripId); }

  async getRouteByTripId(tripId: number): Promise<Route> {
    const routeResult = await firstValueFrom(this.routeService.getRouteByIdAPI(tripId))
    return routeResult!;
  }


}
