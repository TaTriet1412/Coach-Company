import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiPaymentUrl = "http://localhost:8080/api/payments";
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  constructor(private http:HttpClient) {}

  payByVnPay(amount: number, orderInfo: string, ticketId:number): Observable<{ redirectUrl: string}>{
    const headers = this.headers;
    const formData: FormData = new FormData(); 
    formData.append('amount', amount.toString()); 
    formData.append('orderInfo', orderInfo); 
    formData.append('ticketId', ticketId.toString()); 
    
    return this.http.post<{ redirectUrl: string}>(`${this.apiPaymentUrl}/vnpay`,
      formData, {headers});
  }

  processAfterPayed(): Observable<any>{
    const headers = this.headers;
    return this.http.get<any>(`${this.apiPaymentUrl}/afterPayed`, {headers});
  } 
}
