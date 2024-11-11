import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../../Modules/dto/route';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private apiRouteUrl = "http://localhost:8080/api/routes";
  private routes!: Route[] ;
  userStatusChanged: EventEmitter<Route[] | undefined> = new EventEmitter();
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  constructor(private http:HttpClient) { this.loadRoutesStatus() }

  getRoutes(): Observable<Route[]>{
    const headers = this.headers;
    return this.http.get<Route[]>(`${this.apiRouteUrl}`, {headers});
  }

  getRoutesCurrent(): Route[] {
    const savedRoutes =  localStorage.getItem('routes') 
    return savedRoutes ? JSON.parse(savedRoutes) : [];
  }

  loadRoutesStatus(){
    const savedRoutes = localStorage.getItem('routes');
    if (savedRoutes) {
      this.routes = JSON.parse(savedRoutes);
      this.userStatusChanged.emit(this.routes);
    }
  }

  private saveRouteStatus() {
    localStorage.setItem('routes', JSON.stringify(this.routes));
  }

  // Set dữ liệu routes sao khi truy xuất
  setRoutes(routes: Route[]){
    this.routes = routes;
    this.saveRouteStatus();
    this.userStatusChanged.emit(this.routes)
  }

  addRoute(start_point:string,rest_point:string,end_point:string,hours:number,minutes:number,distance:number,price:number): Observable<Route>{
    const headers = this.headers;
    const duration = hours*60*60 + minutes*60;
    return this.http.post<Route>(`${this.apiRouteUrl}`, 
      { start_point,rest_point,end_point,duration,distance,price}, {headers});
  }

  getRouteById(id: number): Route | undefined{
    return this.getRoutesCurrent().find(route => route.id == id);
  }

  updateRoute(id: number,start_point:string,rest_point:string,end_point:string,hours:number,minutes:number,distance:number,price:number,enable:boolean): Observable<Route>{
    const headers = this.headers;
    const duration = hours*60*60 + minutes*60;
    return this.http.put<Route>(`${this.apiRouteUrl}/${id}`, 
      { start_point,rest_point,end_point,duration,distance,price,enable}, {headers});
  }

}
