import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../../Modules/dto/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiTripUrl = "http://localhost:8080/api/trips";
  private tripList!: Trip[];
  TripListChanged: EventEmitter<Trip[] | undefined> = new EventEmitter();
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  constructor(private http:HttpClient) {
    this.loadTripList();
  }

  getTrips(): Observable<Trip[]>{
    const headers = this.headers;
    return this.http.get<Trip[]>(`${this.apiTripUrl}`, {headers});
  }

  setTripList(tripList: Trip[]){
    this.tripList = tripList;
    this.saveTripListStatus();
    this.TripListChanged.emit(this.tripList)
  }
  
  private saveTripListStatus() {
    localStorage.setItem('tripList', JSON.stringify(this.tripList));
  }

  loadTripList(){
    const savedTripList = localStorage.getItem('tripList');
    if (savedTripList) {
      this.tripList = JSON.parse(savedTripList);
      this.TripListChanged.emit(this.tripList);
    }
  }

  getTripList(): Trip[] {
    const savedTripList =  localStorage.getItem('tripList') 
    return savedTripList ? JSON.parse(savedTripList) : [];
  }

  getTripById(id: number): Trip | undefined{
    return this.getTripList().find(trip => trip.id == id);
  }

  getTripByIdAPI(id: number): Observable<Trip>{
    const headers = this.headers;
    return this.http.get<Trip>(`${this.apiTripUrl}/${id}`, {headers});
  }
  
  addTrip(bus_id: number,driver_id: number,codriver_id: number,dateStart: string,time_start: string,duration: number): Observable<Trip>{
    const date_time_start = dateStart+"T"+time_start;
    const headers = this.headers;
    return this.http.post<Trip>(`${this.apiTripUrl}`, 
      { bus_id,driver_id,codriver_id,date_time_start,duration}, {headers});
  }

  updateTrip(id:number,bus_id: number,driver_id: number,codriver_id: number,dateStart: string,time_start: string,duration: number,enable: boolean): Observable<Trip>{
    const date_time_start = dateStart+"T"+time_start;
    const headers = this.headers;
    return this.http.put<Trip>(`${this.apiTripUrl}/${id}`, 
      { bus_id,driver_id,codriver_id,date_time_start,duration,enable}, {headers});
  }

  

}
