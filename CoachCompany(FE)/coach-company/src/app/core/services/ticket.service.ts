import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../../Modules/dto/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiTicketUrl = "http://localhost:8080/api/tickets";
  private TicketList!: Ticket[];
  TicketListChanged: EventEmitter<Ticket[] | undefined> = new EventEmitter();
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  constructor(private http:HttpClient) {
    this.loadTicketList();
  }

  getTickets(): Observable<Ticket[]>{
    const headers = this.headers;
    return this.http.get<Ticket[]>(`${this.apiTicketUrl}`, {headers});
  }

  setTicketList(TicketList: Ticket[]){
    this.TicketList = TicketList;
    this.saveTicketListStatus();
    this.TicketListChanged.emit(this.TicketList)
  }
  
  private saveTicketListStatus() {
    localStorage.setItem('ticketList', JSON.stringify(this.TicketList));
  }

  loadTicketList(){
    const savedTicketList = localStorage.getItem('ticketList');
    if (savedTicketList) {
      this.TicketList = JSON.parse(savedTicketList);
      this.TicketListChanged.emit(this.TicketList);
    }
  }

  getTicketList(): Ticket[] {
    const savedTicketList =  localStorage.getItem('ticketList') 
    return savedTicketList ? JSON.parse(savedTicketList) : [];
  }

  getTicketById(id: number): Ticket | undefined{
    return this.getTicketList().find(Ticket => Ticket.id == id);
  }

  getTicketByIdAPI(id: number): Observable<Ticket>{
    const headers = this.headers;
    return this.http.get<Ticket>(`${this.apiTicketUrl}/${id}`, {headers});
  }

  getPrice(id: number): Observable<number>{
    const headers = this.headers;
    return this.http.get<number>(`${this.apiTicketUrl}/${id}/price`, {headers});
  }

  addTicket(trip_id: number,name_customer: string,phone_customer: string,email_customer: string,seat_list: number[]): Observable<Ticket>{
    const headers = this.headers;
    return this.http.post<Ticket>(`${this.apiTicketUrl}`, 
      { trip_id,name_customer,phone_customer,email_customer,seat_list}, {headers});
  }

  updateTicket(ticket_id: number,trip_id: number, name_customer: string, phone_customer: string, email_customer: string, seat_list: number[],payment_status: boolean) {
    const headers = this.headers;
    return this.http.post<Ticket>(`${this.apiTicketUrl}/${ticket_id}`, 
      { trip_id,name_customer,phone_customer,email_customer,seat_list,payment_status}, {headers});
  }

  deleteTicket(id: number): Observable<void>{
    const headers = this.headers;
    return this.http.delete<void>(`${this.apiTicketUrl}/${id}`, {headers});
  }

  updatePay(ticketId: number): Observable<Ticket>{
    const headers = this.headers;
    return this.http.get<Ticket>(`${this.apiTicketUrl}/pay/${ticketId}`, {headers});
  }

  cancleRemoveTicket(ticketId: number): Observable<Ticket>{
    const headers = this.headers;
    return this.http.get<Ticket>(`${this.apiTicketUrl}/cancle-auto-remove/${ticketId}`, {headers});
  }

}
