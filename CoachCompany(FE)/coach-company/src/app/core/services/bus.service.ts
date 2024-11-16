import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bus } from '../../Modules/dto/bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {
  private apiBusUrl = "http://localhost:8080/api/buses";
  private busList!: Bus[];
  busListChanged: EventEmitter<Bus[] | undefined> = new EventEmitter();
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  constructor(private http:HttpClient) {
    this.loadBusList();
  }

  getBuses(): Observable<Bus[]>{
    const headers = this.headers;
    return this.http.get<Bus[]>(`${this.apiBusUrl}`, {headers});
  }

  setBusList(busList: Bus[]){
    this.busList = busList;
    this.saveBusListStatus();
    this.busListChanged.emit(this.busList)
  }
  
  private saveBusListStatus() {
    localStorage.setItem('busList', JSON.stringify(this.busList));
  }

  loadBusList(){
    const savedBusList = localStorage.getItem('busList');
    if (savedBusList) {
      this.busList = JSON.parse(savedBusList);
      this.busListChanged.emit(this.busList);
    }
  }

  getBusList(): Bus[] {
    const savedBusList =  localStorage.getItem('busList') 
    return savedBusList ? JSON.parse(savedBusList) : [];
  }

  getBusListFromRouteId(routeId: number): Bus[] {
    const busList = this.getBusList().filter(bus => bus.routeId == routeId);
    return busList.length > 0 ? busList : [];
  }

  getBusById(id: number): Bus | undefined{
    return this.getBusList().find(bus => bus.id == id);
  }

  getBusByIdAPI(id: number): Observable<Bus>{
    const headers = this.headers;
    return this.http.get<Bus>(`${this.apiBusUrl}/${id}`, {headers});
  }


  addBus(number_bus:string,route_id:number): Observable<Bus>{
    const headers = this.headers;
    return this.http.post<Bus>(`${this.apiBusUrl}`, 
      { number_bus,route_id}, {headers});
  }

  updateBus(id: number,number_bus:string,enable:boolean): Observable<Bus>{
    const headers = this.headers;
    return this.http.put<Bus>(`${this.apiBusUrl}/${id}`, 
      {number_bus,enable}, {headers});
  }

}
