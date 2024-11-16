import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trip } from '../../../dto/trip';
import { Bus } from '../../../dto/bus';
import { TripService } from '../../../../core/services/trip.service';
import { CommonModule } from '@angular/common';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { TicketService } from '../../../../core/services/ticket.service';
import { Ticket } from '../../../dto/ticket';
import { Seat } from '../../../dto/seat';
import { SeatService } from '../../../../core/services/seat.service';



@Component({
  selector: 'app-update-ticket',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,MatSelectModule, MatFormFieldModule,MatInputModule],
  templateUrl: './update-ticket.component.html',
  styleUrl: './update-ticket.component.css',
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateTicketComponent implements OnInit {
  ticketCurr!: Ticket;
  busCurrent!: Bus;
  tripList!: Trip[];
  busList!: Bus[];
  seatList!: Seat[];
  seatListIsOccupied!: Seat[];
  inputsSeats: any[] = []

  // Array after input
  filteredTripList: Trip[] = [];
  @ViewChild('tripSelect') tripSelect!: MatSelect;

  constructor(
    private url: ActivatedRoute,
    private seatService:SeatService,
    private tripService:TripService,
    private ticketService:TicketService,
    private snackBarService: SnackBarService,
    private router:Router,
    private cdr: ChangeDetectorRef,
  ){}
  ticketForm= new FormGroup({
    trip_id: new FormControl(''),
    name_customer: new FormControl(''),
    phone_customer: new FormControl(''),
    email_customer: new FormControl(''),
    seat_list: new FormControl<number[]>([]),
    payment_status: new FormControl<boolean>(false),
  })

  ngOnInit(): void {
    // this.ticketService.getTicketByIdAPI(id)
    //   .subscribe({
    //     next: (response:Ticket) => {
    //       this.ticketCurr = response;
    //       console.log(this.ticketCurr);
    //       this.ticketForm.patchValue(this.ticketCurr!)
    //       this.ticketForm.get("trip_id")?.setValue(String(this.ticketCurr.tripId)); 
    //       this.ticketCurr.seats.forEach(seat => {
    //         this.inputsSeats.push(seat.id);
    //       })
    //       this.ticketForm.get("seat_list")?.setValue(this.inputsSeats)          
    //     },
    //     error:(response:any) => this.snackBarService.notifyError(response.error.message)
    //   })

      
 
    // Load trip
    this.tripService.getTrips().subscribe(
      {
        next: (response:Trip[]) => {
          this.tripService.setTripList(response)
        },
        error: (response: any) => console.log(response.error)
      }
    );
    this.tripList = this.tripService.getTripList();
    this.filteredTripList = this.tripList;

    // Load busList after choosing trip
    this.ticketForm.get('trip_id')?.valueChanges
    .subscribe(trip_id => this.refreshSeatLists(Number(trip_id!)));

    const id = Number(this.url.snapshot.paramMap.get('id'));
    this.ticketCurr = this.ticketService.getTicketById(id)!;
    this.ticketForm.patchValue(this.ticketCurr)
    this.ticketForm.get("trip_id")?.setValue(String(this.ticketCurr.tripId)); 
    this.ticketCurr.seats.forEach(seat => {
      this.inputsSeats.push(seat.id);
    })
    this.ticketForm.get("seat_list")?.setValue(this.inputsSeats) 

  }

  refreshSeatLists(trip_id: number) {
    // All seats of this trip
    this.seatService.getSeatListByTripId(trip_id).subscribe(
      {
        next: (seatList: Seat[]) => {
          this.seatService.setSeatList(seatList);
          
          // Seats List is occupied
          this.seatService.getSeatListIsOccupiedByTripId(trip_id).subscribe(
            {
              next: (seatListIsOccupied: Seat[]) => {
                this.seatListIsOccupied = seatListIsOccupied;
  
                // Filter seatList to get empty seats
                this.seatList = seatList.filter(seat =>
                    !seatListIsOccupied.some(occupiedSeat => occupiedSeat.id === seat.id) 
                    || this.inputsSeats.includes(seat.id)
                );
  
                // Trigger change detection
                this.cdr.detectChanges();
              },
              error: (response: any) => console.log(response.error)
            }
          );
        },
        error: (response: any) => console.log(response.error)
      }
    );
  }
  
  handleUpdateTicket(event:Event){
    event.preventDefault();
    const trip_id = this.ticketForm.get("trip_id")?.value?.trim()!;
    const seat_list = this.ticketForm.get("seat_list")?.value;
    const name_customer = this.ticketForm.get("name_customer")?.value?.trim()!;
    const phone_customer = this.ticketForm.get("phone_customer")?.value?.trim()!;
    const email_customer = this.ticketForm.get("email_customer")?.value?.trim()!;
    const payment_status = this.ticketForm.get("payment_status")?.value!;
    const emailPattern= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Thông báo warning
    if(trip_id==""){
      this.snackBarService.notifyWarning("Vui lòng chọn chuyến!");
    
    }else if(seat_list?.length==0){
      this.snackBarService.notifyWarning("Chọn tối thiểu một ghế!");

    }else if(name_customer==""){
      this.snackBarService.notifyWarning("Vui lòng nhập tên!");
    
    }else if(phone_customer==""){
      this.snackBarService.notifyWarning("Vui lòng nhập số điện thoại!");

    }else if(email_customer==""){
      this.snackBarService.notifyWarning("Vui lòng nhập email!");
    
    }else if(!emailPattern.test(email_customer)){
      this.snackBarService.notifyWarning("Email không hợp lệ");
    
    }
    else { // Thông bảo lỗi hoac thành công
      console.log(this.ticketCurr.id,Number(trip_id),name_customer,phone_customer,email_customer,seat_list!,payment_status);
      this.ticketService.updateTicket(this.ticketCurr.id,Number(trip_id),name_customer,phone_customer,email_customer,seat_list!,payment_status)
        .subscribe({
          next: (response: Ticket) => {
            this.snackBarService.notifySuccess("Lưu thành công");
            const updatedTickets = this.ticketService.getTicketList().map(ticket => ticket.id === response.id ? response : ticket );
            this.ticketService.setTicketList(updatedTickets);
            this.inputsSeats = seat_list!

            // Refresh seat lists and trigger change detection 
            this.refreshSeatLists(Number(trip_id));
          },
          error: (response:any) => this.snackBarService.notifyError(response.error.message)
        })
    }
  }


   // Reload route when input
   filterTrips(value: string) { 
    const normalizeText = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const filterValue = normalizeText(value.toLowerCase()); 
    this.filteredTripList = this.tripList.filter(trip => 
      normalizeText(String(trip.id).toLowerCase()).includes(filterValue)
    );
    this.cdr.detectChanges();

    this.ticketForm.get('trip_id')?.setValue(""); 

    // Open the dropdown if there are filtered routes if 
    if (this.filteredTripList.length > 0) { 
      this.tripSelect.open(); 
    };
  }

  onTripSearch(event: Event) { 
    const input = event.target as HTMLInputElement; 
    if (input) { 
      const value = input.value; 
      this.filterTrips(value); 
    }
  }

  backList() {
    this.router.navigate(['admin/ticket']);
  }

  removeSeatsId(){
    this.ticketForm.get('seat_list')?.setValue([]);
  }
}
