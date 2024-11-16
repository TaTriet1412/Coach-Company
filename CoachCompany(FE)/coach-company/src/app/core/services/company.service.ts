import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../../Modules/dto/company';
import { Ticket } from '../../Modules/dto/ticket';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private apiCompanyUrl = "http://localhost:8080/api/company";
  private company!: Company;
  companyChanged: EventEmitter<Company | undefined> = new EventEmitter();
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  constructor(private http:HttpClient) {
    this.loadCompany();
  }

  getCompany(): Observable<Company>{
    const headers = this.headers;
    return this.http.get<Company>(`${this.apiCompanyUrl}`, {headers});
  }

  setCompany(company: Company){
    this.company = company;
    this.saveCompanyStatus();
    this.companyChanged.emit(this.company)
  }
  
  private saveCompanyStatus() {
    localStorage.setItem('company', JSON.stringify(this.company));
  }

  loadCompany(){
    const savedCompany = localStorage.getItem('company');
    if (savedCompany) {
      this.company = JSON.parse(savedCompany);
      this.companyChanged.emit(this.company);
    }
  }

  getCompanyCurr(): Company{
    const savedCompany = localStorage.getItem("company");
    return JSON.parse(savedCompany!);
  }

  getDifferenceInMonths(date1: Date, date2: Date): number {
    return (date2.getFullYear() - date1.getFullYear()) * 12 + date2.getMonth() - date1.getMonth() +1;
  }
  
  getAverageMonthlyTotalRevenue(ticketList: Ticket[], company: Company): number {
    // Company open date
    const open_date = new Date(company.open_date);
    const now = new Date();
    // Filter the tickets with payment_status == true and payment_time within the range
    const paidTickets = ticketList.filter(ticket => 
      ticket.payment_status && new Date(ticket.payment_time) >= open_date && new Date(ticket.payment_time) <= now
    );

    // Sum up the revenue from the filtered tickets
    const totalRevenue = paidTickets.reduce((sum, ticket) => sum + ticket.price, 0);
  
    // Calculate the number of months between the company's open date and now
    const numberOfMonths = this.getDifferenceInMonths(open_date, now);
  
    // Calculate the average monthly total revenue
    const averageMonthlyTotalRevenue = Math.floor(totalRevenue / numberOfMonths);

  
    return averageMonthlyTotalRevenue;
  }
  


  getAverageAnnualTotalRevenue(ticketList: Ticket[],company: Company): number {
    // Company open date
    const open_date = new Date(company.open_date);
    const now = new Date();
    // Filter the tickets with payment_status == true
    const paidTickets = ticketList.filter(ticket => 
      ticket.payment_status && new Date(ticket.payment_time) >= open_date && new Date(ticket.payment_time) <= now
    );
  
    // Sum up the revenue from the filtered tickets
    const totalRevenue = paidTickets.reduce((sum, ticket) => sum + ticket.price, 0);
  
    // Calculate the number of years between now and the earliest payment_time
    const numberOfYears = now.getFullYear()-open_date.getFullYear()+1;
  
    // Calculate the average annual total revenue
    const averageAnnualTotalRevenue = Math.floor(totalRevenue / numberOfYears);
  
    return averageAnnualTotalRevenue;
  }
  


  

}
