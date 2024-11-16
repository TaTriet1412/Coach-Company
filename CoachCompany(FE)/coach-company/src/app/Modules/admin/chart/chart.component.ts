import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { TicketService } from '../../../core/services/ticket.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { CompanyService } from '../../../core/services/company.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { Ticket } from '../../dto/ticket';
import { Company } from '../../dto/company';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
Chart.register(...registerables);

type TypeTime = 'year' | 'quarter' | 'month';

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit,OnChanges,OnDestroy {
  @Input() typeChart: string = 'line'; // Default chart type
  @Input() typeTime: TypeTime = 'year';
  @Input() yearDetail!: number;
  ticketList!: Ticket[];
  companyCurr!: Company;
  labels: string[] = [];
  public config: any = {
    type: this.typeChart,
    data: {
      labels: [],
      datasets: [{
        label: 'Dataset',
        data: [],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(110, 255, 0)',
        ],
        hoverOffset: 4
      }]
    }
  };
  chart: any;

  constructor(
    private ticketService:TicketService,
    private snackBarService:SnackBarService,
    private companyService: CompanyService,
    private cdr:ChangeDetectorRef
  ){}

  async ngOnInit(): Promise<void> {
    
  
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
    
    this.updateDataOfYears();
    await this.initializeChart();

    // Trigger change detection to update the UI
    this.cdr.detectChanges();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> { 
    if (changes['typeChart'] && !changes['typeChart'].isFirstChange()) {
      await this.updateTypeChart(this.typeChart); 
    } 
    if (changes['typeTime'] && !changes['typeTime'].isFirstChange() && this.typeTime=='year') { 
      await this.updateDataOfYears(); 
    }
    if (changes['typeTime']   && !changes['typeTime'].isFirstChange() && this.typeTime!='year') { 
      await this.updateDataOfCurrTypeTime(this.typeTime,this.yearDetail); 
    }
    if (changes['yearDetail']  && !changes['yearDetail'].isFirstChange() && this.typeTime!='year') { 
      await this.updateDataOfCurrTypeTime(this.typeTime,this.yearDetail); 
    }

  }

  async initializeChart(): Promise<void> {
    if (this.chart) {
        await this.chart.destroy();
    }
    this.chart = new Chart('Chart', this.config);
  }


  async updateTypeChart(type: string): Promise<void> {
    this.typeChart = type;
    this.config.type = type;
    await this.initializeChart();
  }

  async updateDateOfChart(typeTime: TypeTime): Promise<void> {
    this.typeTime = typeTime;
    await this.initializeChart();
  }

  async updateDataOfCurrTypeTime(typeTime: TypeTime,yearDetail: number): Promise<void>{
    if (typeTime === 'quarter') {
      this.config.data.labels = this.getQuarterLabels();
      this.config.data.datasets[0].data = this.getQuarterData(yearDetail);
    } else {
      this.config.data.labels = this.getMonthLabels();
      this.config.data.datasets[0].data = this.getMonthData(yearDetail);
    }
    await this.initializeChart();
  }

  async updateDataOfYears(): Promise<void>{
    this.config.data.labels = this.getYearsLabels();
    this.config.data.datasets[0].data = this.getYearsData();
    await this.initializeChart();
  }

  getYearsLabels(): string[] {
    // Update yearList
    let yearList = [];
    const now = new Date();
    let countYear = 0; 
    while(true){
      yearList.push((now.getFullYear()-countYear).toString());
      countYear++;
      if(countYear==4) break;
    }
    yearList.reverse();
    return yearList;
  }

  getYearsData(): number[] {
    // Update yearList
    let yearList = [];
    const now = new Date();
    let countYear = 0; 
    while(true){
      yearList.push((now.getFullYear()-countYear).toString());
      countYear++;
      if(countYear==4) break;
    }
    yearList.reverse();
    let revenueOfYears:number[] = [];
    yearList.forEach(year =>{
      let revenueOfYear = 0;
      this.ticketList.forEach(ticket =>{
        if(ticket.payment_status){
          let currYear = new Date(ticket.payment_time);
          if(Number(year) == currYear.getFullYear()){
            revenueOfYear += ticket.price;
          }
        }
      })
      revenueOfYears.push(revenueOfYear);
    })
    return revenueOfYears;
  }

  getQuarter(date: Date): number {
    const month = date.getMonth(); 
    return Math.floor(month / 3) + 1; 
  }

  getQuarterLabels(): string[] {
    return ['Q1', 'Q2', 'Q3', 'Q4'];
  }

  getQuarterData(yearDetail: number): number[] {
    let revenueOfQuarterList:number[] = [];
    let quarterList = [1,2,3,4];
    quarterList.forEach(quarter =>{
      let revenueOfQuarter = 0;
      this.ticketList.forEach(ticket =>{
        if(ticket.payment_status) {
          let currDate = new Date(ticket.payment_time);
          if(quarter == this.getQuarter(currDate) && currDate.getFullYear() == yearDetail){
            revenueOfQuarter += ticket.price;
          }
        }
      })
      revenueOfQuarterList.push(revenueOfQuarter);
    })
    return revenueOfQuarterList;
  }

  getMonthLabels(): string[] {
    return ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  }

  getMonthData(yearDetail: number): number[] {
    let revenueOfMonthList:number[] = [];
    let monthList = [1,2,3,4,5,6,7,8,9,10,11,12];
    monthList.forEach(month =>{
      let revenueOfMonth = 0;
      this.ticketList.forEach(ticket =>{
        if(ticket.payment_status){
          let currDate = new Date(ticket.payment_time);
          if(month == currDate.getMonth()+1 && currDate.getFullYear() == yearDetail){
            revenueOfMonth += ticket.price;
          }
        }
      })
      revenueOfMonthList.push(revenueOfMonth);
    })
    console.log(revenueOfMonthList)
    return revenueOfMonthList;
  }



  async exportChart(): Promise<void> {
    if (this.chart) {
      const canvas = document.getElementById('Chart') as HTMLCanvasElement;
      const canvasImage = await html2canvas(canvas);

      // Create a new PDF document in landscape mode
      const pdf = new jsPDF('landscape');

      // Get the canvas dimensions
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      // Convert the canvas image to a data URL
      const imgData = canvasImage.toDataURL('image/png');

      // Calculate the width and height ratio to fit the PDF
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const widthRatio = pdfWidth / imgWidth;
      const heightRatio = pdfHeight / imgHeight;
      const ratio = Math.min(widthRatio, heightRatio);

      // Resize the image to fit the PDF dimensions
      const finalImgWidth = imgWidth * ratio;
      const finalImgHeight = imgHeight * ratio;

      // Add the image to the PDF with full width and height
      pdf.addImage(imgData, 'PNG', 0, 0, finalImgWidth, finalImgHeight);

      // Save the PDF
      pdf.save('chart.pdf');
    }
  }



  ngOnDestroy(): void { if (this.chart) { this.chart.destroy(); } }
}
