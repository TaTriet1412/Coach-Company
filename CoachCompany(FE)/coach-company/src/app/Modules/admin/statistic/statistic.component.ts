import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ChartComponent } from "../chart/chart.component";
import { Ticket } from '../../dto/ticket';
import { TicketService } from '../../../core/services/ticket.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { CompanyService } from '../../../core/services/company.service';
import { Company } from '../../dto/company';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { ShareModule } from '../../share/share.module';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { Contact } from '../../dto/contact';
import { ContactService } from '../../../core/services/contact.service';
import { response } from 'express';
import { After } from 'v8';

type TypeTime = 'year' | 'quarter' | 'month';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [ChartComponent,ShareModule,MatSelectModule, MatFormFieldModule,CommonModule],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
  providers: [
    provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'vi-VN'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,useValue: { subscriptSizing: 'dynamic' },}
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticComponent implements OnInit{
  isLoading = true;
  ticketList!: Ticket[];
  contactList!: Contact[];
  companyCurr!: Company;
  averageMonthLyTotalRevenue!: number;
  averageYearLyTotalRevenue!: number;
  inProcessContactLength!: number;
  yearList: number[] = [];
  disableYearDetail: boolean = true;
  @ViewChild(ChartComponent) chartComponent!: ChartComponent;
  @Input() typeChart: string = 'line'; // Default chart type
  @Input() typeTime: TypeTime = 'year'
  @Input() yearDetail!: number;

  constructor(
    private ticketService:TicketService,
    private snackBarService:SnackBarService,
    private contactService:ContactService,
    private companyService: CompanyService,
    private cdr:ChangeDetectorRef
  ){}
  
  async ngOnInit(): Promise<void> {
    await this.fetchActualData();
  }

  async fetchActualData(): Promise<void>{
    await setTimeout(async() =>{
      // Get tickets
      const ticketsResponse = await firstValueFrom(this.ticketService.getTickets());
      this.ticketService.setTicketList(ticketsResponse);
      this.ticketList = this.ticketService.getTicketList();

      // Fetch prices for each ticket
      const priceObservables = this.ticketList.map(ticket =>
        this.ticketService.getPrice(ticket.id).pipe(
          map(price => {
            ticket.price = price;
            return ticket;
          })
        )
      );

      // Wait for all prices to be fetched
      await firstValueFrom(forkJoin(priceObservables));

      // Get company details
      const companyResponse = await firstValueFrom(this.companyService.getCompany());
      this.companyService.setCompany(companyResponse);
      this.companyCurr = this.companyService.getCompanyCurr();

      // Calculate average monthly total revenue
      this.averageMonthLyTotalRevenue = this.companyService.getAverageMonthlyTotalRevenue(this.ticketList, this.companyCurr);
      this.averageYearLyTotalRevenue = this.companyService.getAverageAnnualTotalRevenue(this.ticketList, this.companyCurr);

      // Load contact list
      this.contactService.getContacts()
        .subscribe({
          next: (response: Contact[]) => {
            this.contactService.setContactList(response);
            this.contactList = response;
            const inProcessContact = this.contactList.filter(contact => contact.process_time==null);
            this.inProcessContactLength = inProcessContact.length;
            this.cdr.detectChanges();
          }
        })

      // Update yearList
      const now = new Date();
      let countYear = 0; 
      while(true){
        this.yearList.push(now.getFullYear()-countYear);
        countYear++;
        if(countYear==4) break;
      }
      this.yearList.reverse();
      this.isLoading = false;
      // Trigger change detection to update the UI
      this.cdr.detectChanges();
    },2000)
  }

  handleChangeTypeTime(event: any) {
    if(event.value=="year"){
      this.disableYearDetail = true;
    }else{
      this.disableYearDetail = false;
    }
    this.typeTime = event.value;
  }

  handleChangeYearDetail(event: any) {
    this.yearDetail = event.value
  }

  handleChangeTypeChart(event: any){
    this.typeChart = event.value;
  }

  exportChart(){
    if (this.chartComponent) { this.chartComponent.exportChart(); }
  }

  
}
