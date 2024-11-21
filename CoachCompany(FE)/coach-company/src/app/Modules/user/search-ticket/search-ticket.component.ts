import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../dto/ticket';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { NgxCaptchaModule } from 'ngx-captcha';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-ticket',
  templateUrl: './search-ticket.component.html',
  styleUrl: './search-ticket.component.css',
  standalone: true,
  imports: [ReactiveFormsModule,NgxCaptchaModule]
})
export class SearchTicketComponent implements OnInit {
  siteKey:string = "6LdDG3QqAAAAAOFA5x6wPJPC8dMCICHGTuabMmkE";
  disabled:boolean = true;
  ticketList!: Ticket[];
  
  ticketFormGroup= new FormGroup({
    phone: new FormControl(''),
    ticketId: new FormControl(''),
    recaptcha: new FormControl(''),
  })



  constructor(
    private ticketService: TicketService,
    private snackBarService: SnackBarService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Load ticket list
    this.ticketService.getTickets()
      .subscribe({
        next: (response:Ticket[]) => {
          this.ticketService.setTicketList(response);
        },
        error: (response:any) => this.snackBarService.notifyErrorUser(response.error.message)
      })
      this.ticketList = this.ticketService.getTicketList()
  }

  handleSuccess(){
    this.disabled = false;
  }

  handleGoToTicket(event:Event) {
    event.preventDefault();
    const phone = this.ticketFormGroup.get("phone")?.value!.trim();
    const ticketId = this.ticketFormGroup.get("ticketId")?.value!.trim();

    if(phone == "") {
      this.snackBarService.notifyWarningUser("Vui lòng số điện thoại");

    
    }else if(ticketId=="") {
      this.snackBarService.notifyWarningUser("Vui lòng nhập mã vé");

    }else {
      const matchingTicket = this.ticketList.find(ticket => 
        ticket.phone_customer === phone 
        && ticket.id.toString() === ticketId
      );
      if(matchingTicket) {
        this.router.navigate([`/ticket/detail-ticket/${ticketId}`])
      }else {
        this.snackBarService.notifyWarningUser("Thông tin vé không đúng")
      }


    }
  }
}
