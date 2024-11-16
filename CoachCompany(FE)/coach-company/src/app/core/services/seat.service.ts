import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Seat } from '../../Modules/dto/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiSeatUrl = "http://localhost:8080/api/seats";
  private seatList!: Seat[];
  SeatListChanged: EventEmitter<Seat[] | undefined> = new EventEmitter();
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  constructor(private http:HttpClient) {
    this.loadSeatList();
  }

  getSeats(): Observable<Seat[]>{
    const headers = this.headers;
    return this.http.get<Seat[]>(`${this.apiSeatUrl}`, {headers});
  }

  setSeatList(seatList: Seat[]){
    this.seatList = seatList;
    this.saveSeatListStatus();
    this.SeatListChanged.emit(this.seatList)
  }
  
  private saveSeatListStatus() {
    localStorage.setItem('seatList', JSON.stringify(this.seatList));
  }

  loadSeatList(){
    const savedSeatList = localStorage.getItem('seatList');
    if (savedSeatList) {
      this.seatList = JSON.parse(savedSeatList);
      this.SeatListChanged.emit(this.seatList);
    }
  }

  getSeatList(): Seat[] {
    const savedSeatList =  localStorage.getItem('seatList') 
    return savedSeatList ? JSON.parse(savedSeatList) : [];
  }

  getSeatById(id: number): Seat | undefined{
    return this.getSeatList().find(Seat => Seat.id == id);
  }


  getSeatListByTripId(id: number): Observable<Seat[]>{
    const headers = this.headers;
    return this.http.get<Seat[]>(`${this.apiSeatUrl}/trip/${id}`, {headers});
  }

  getSeatListIsOccupiedByTripId(id: number): Observable<Seat[]>{
    const headers = this.headers;
    return this.http.get<Seat[]>(`${this.apiSeatUrl}/trip/occupied/${id}`, {headers});
  }
}
