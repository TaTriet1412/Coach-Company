import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TicketService } from '../../../core/services/ticket.service';
import { Ticket } from '../../dto/ticket';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { NgxCaptchaModule, ReCaptcha2Component } from 'ngx-captcha';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-ticket',
  templateUrl: './search-ticket.component.html',
  styleUrls: ['./search-ticket.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgxCaptchaModule]
})
export class SearchTicketComponent implements OnInit {
  siteKey: string = "6LdDG3QqAAAAAOFA5x6wPJPC8dMCICHGTuabMmkE";
  disabled: boolean = true;
  ticketList!: Ticket[];

  ticketFormGroup = new FormGroup({
    phone: new FormControl(''),
    ticketId: new FormControl(''),
    recaptcha: new FormControl(''),
  });

  // Explicitly declare captchaElem as type ReCaptcha2Component
  @ViewChild('captchaElem') captchaElem!: ReCaptcha2Component;

  constructor(
    private ticketService: TicketService,
    private snackBarService: SnackBarService,
    private router: Router,
    private cdr:ChangeDetectorRef,
  ) { }

  ngOnInit() {
    // Load ticket list
    this.ticketService.getTickets()
      .subscribe({
        next: (response: Ticket[]) => {
          this.ticketService.setTicketList(response);
        },
        error: (response: any) => this.snackBarService.notifyErrorUser(response.error.message)
      });
    this.ticketList = this.ticketService.getTicketList();
  }

  handleSuccess() {
    this.disabled = false;
  }

  handleGoToTicket(event: Event) {
    event.preventDefault();
    const phone = this.ticketFormGroup.get("phone")?.value!.trim();
    const ticketId = this.ticketFormGroup.get("ticketId")?.value!.trim();

    if (phone == "") {
      this.snackBarService.notifyWarningUser("Vui lòng nhập số điện thoại");
      this.resetCaptcha();  // Reset recaptcha when there's an error
      this.ticketFormGroup.get("phone")?.setValue("")
      this.ticketFormGroup.get("ticketId")?.setValue("")
    } else if (ticketId == "") {
      this.snackBarService.notifyWarningUser("Vui lòng nhập mã vé");
      this.resetCaptcha();  // Reset recaptcha when there's an error
      this.ticketFormGroup.get("phone")?.setValue("")
      this.ticketFormGroup.get("ticketId")?.setValue("")
    } else {
      const matchingTicket = this.ticketList.find(ticket =>
        ticket.phone_customer === phone
        && ticket.id.toString() === ticketId
      );
      if (matchingTicket) {
        this.router.navigate([`/user/ticket/detail-ticket/${ticketId}`]);
      } else {
        this.snackBarService.notifyWarningUser("Thông tin vé không đúng");
        this.resetCaptcha();  // Reset recaptcha when the ticket information is incorrect
        this.ticketFormGroup.get("phone")?.setValue("")
        this.ticketFormGroup.get("ticketId")?.setValue("")
      }
    }
  }

  // Reset reCAPTCHA when there's an error
  resetCaptcha() {
    if (this.captchaElem) {
      this.captchaElem.resetCaptcha(); // Reset recaptcha
      this.disabled = true; // Disable submit button again
      this.cdr.detectChanges();
    }
  }
}
