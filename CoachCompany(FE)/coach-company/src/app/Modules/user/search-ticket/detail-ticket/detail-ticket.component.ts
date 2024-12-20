import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Ticket } from '../../../dto/ticket';
import { ShareModule } from '../../../share/share.module';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../../core/services/ticket.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '../../../dto/route';
import { firstValueFrom } from 'rxjs';
import { SeatService } from '../../../../core/services/seat.service';
import { Trip } from '../../../dto/trip';
import { RouteService } from '../../../../core/services/route.service';
import { TripService } from '../../../../core/services/trip.service';
import { PaymentService } from '../../../../core/services/payment.service';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { BusService } from '../../../../core/services/bus.service';
import { response } from 'express';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-detail-ticket',
  standalone: true,
  imports: [ShareModule,CommonModule,ReactiveFormsModule],
  templateUrl: './detail-ticket.component.html',
  styleUrl: './detail-ticket.component.css'
})

export class DetailTicketComponent implements OnInit,AfterViewInit{
  ticketCurr!: Ticket;
  ticketId!: number;
  seatNameList: string[] = [];
  tripId!: number;
  tripCurr!: Trip;
  route!: Route;

  payGroup = new FormGroup({});


  constructor(
    private ticketService: TicketService,
    private busService: BusService,
    public routeService: RouteService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private tripService:TripService,
    private cdr: ChangeDetectorRef,
    private seatService: SeatService,
    private paymentService:PaymentService,
    private snackBarService: SnackBarService,
  ){}

  async ngOnInit(): Promise<void> {
    (this.activeRoute.params.subscribe(params => {
      this.ticketId = +params['id'];
    }))
    const ticketCurrList = await firstValueFrom(this.ticketService.getTickets())
    this.ticketService.setTicketList(ticketCurrList)
    this.ticketCurr = this.ticketService.getTicketById(this.ticketId)!;
    this.tripId = this.ticketCurr.tripId;

    
    const seatList = await firstValueFrom (this.seatService.getSeats())
    this.seatService.setSeatList(seatList)
    
    // load seat name list
    this.loadSeatNameList();
    
    //load trip
    const tripCurrAPI = await firstValueFrom( this.tripService.getTripByIdAPI(this.tripId))
    this.tripCurr = tripCurrAPI;
    
    // load Route
    this.loadRouteByTripId(this.ticketCurr.tripId);

    this.cdr.detectChanges();
  }

  async ngAfterViewInit(): Promise<void> {
      await (this.ngOnInit());
  }

  async loadSeatNameList(): Promise<void> {
    const seatList = this.ticketCurr.seats;
    this.seatNameList = await Promise.all(seatList.map(async (seat) => {
      return seat?.name || '';
    }));
  }

  async loadRouteByTripId(tripId: number): Promise<void> { this.route = await this.getRouteByTripId(tripId); }
  
  async getRouteByTripId(tripId: number): Promise<Route> {
    const busId = this.tripCurr.busId
    const busResult = await firstValueFrom(this.busService.getBusByIdAPI(busId))
    const routeResult = await firstValueFrom(this.routeService.getRouteByIdAPI(busResult.routeId))
    return routeResult!;
  }

  GoToPay(event:Event){
    event.preventDefault()
    // this.paymentService.payByVnPay(
    //   this.route.price*this.seatNameList.length,
    //   `Thanh toán VNPAY mã vé ${this.ticketId}`,
    //   this.ticketId)
    //   .subscribe({
    //     next: (response:any)=>{
    //       if (response.redirectUrl) {
    //          window.location.href = response.redirectUrl; 
    //         } else { 
    //           this.snackBarService.notifyErrorUser("Đường dẫn đến trang thanh toán bị lỗi")
    //         }
    //     }, 
    //     error: (response:any) => { 
    //       this.snackBarService.notifyErrorUser(`Thanh toán lỗi: ${response.error.message}`)
    //     }
    //   })
  

    this.ticketService.updatePay(this.ticketId)
      .subscribe({
        next: (response: any) => {
          this.snackBarService.notifySuccessUser("Thanh toán thành công");
          this.router.navigate(["/user/home"])
        }
      })
  }
}
