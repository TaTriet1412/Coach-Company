import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../../Modules/dto/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUserUrl = "http://localhost:8080/api/users";
  private userList!: User[];
  userListChanged: EventEmitter<User[] | undefined> = new EventEmitter();
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  

  constructor(private http:HttpClient) {
    this.loadUserListStatus();
  }

  
  // -------------------Nhan su

  // Lay User
  getUsers(): Observable<User[]>{
    const headers = this.headers;
    return this.http.get<User[]>(`${this.apiUserUrl}`, {headers});
  }

  setUserList(userList: User[]){
    this.userList = userList;
    this.saveUserListStatus();
    this.userListChanged.emit(this.userList)
  }
  
  private saveUserListStatus() {
    localStorage.setItem('userList', JSON.stringify(this.userList));
  }

  loadUserListStatus(){
    const savedUserList = localStorage.getItem('userList');
    if (savedUserList) {
      this.userList = JSON.parse(savedUserList);
      this.userListChanged.emit(this.userList);
    }
  }

  getUserListCurrent(): User[]{
    const savedUserList =  localStorage.getItem('userList') 
    return savedUserList ? JSON.parse(savedUserList) : [];
  }

  getDriverCurrent(): User[] {
    const savedUserList =  localStorage.getItem('userList') 
    const currUserList: User[] = savedUserList ? JSON.parse(savedUserList) : [];
    return currUserList.filter(user => user.role ===3);
  }

  getStaffCurrent(): User[] {
    const savedUserList =  localStorage.getItem('userList') 
    const currUserList: User[] = savedUserList ? JSON.parse(savedUserList) : [];
    return currUserList.filter(user => user.role ===2);
  }

  getCoDriverCurrent(): User[] {
    const savedUserList =  localStorage.getItem('userList') 
    const currUserList: User[] = savedUserList ? JSON.parse(savedUserList) : [];
    return currUserList.filter(user => user.role ===4);
  }


  addDriver(name: string, email: string, phone: string, birthday: string, gender: boolean) {
    const headers = this.headers;
    const role = 3;
    return this.http.post<User>(`${this.apiUserUrl}`, 
      { name,email,phone,birthday,gender,role}, {headers});
  }

  addStaff(name: string, email: string, phone: string, birthday: string, gender: boolean) {
    const headers = this.headers;
    const role = 2;
    return this.http.post<User>(`${this.apiUserUrl}`, 
      { name,email,phone,birthday,gender,role}, {headers});
  }

  addCoDriver(name: string, email: string, phone: string, birthday: string, gender: boolean) {
    const headers = this.headers;
    const role = 4;
    return this.http.post<User>(`${this.apiUserUrl}`, 
      { name,email,phone,birthday,gender,role}, {headers});
  }

  getDriverById(id: number): User | undefined{
    return this.getDriverCurrent().find(driver => driver.id == id);
  }

  getCoDriverById(id: number): User | undefined{
    return this.getCoDriverCurrent().find(driver => driver.id == id);
  }

  getStaffById(id: number): User | undefined{
    return this.getStaffCurrent().find(driver => driver.id == id);
  }

  updateDriver(id: number,name: string, email: string, phone: string, birthday: string, gender: boolean, enable: boolean) {
    const headers = this.headers;
    return this.http.put<User>(`${this.apiUserUrl}/${id}`, 
      { name,email,phone,birthday,gender,enable}, {headers});
  }

  updateStaff(employeeId: number, name: string, email: string, phone: string, birthday: string, gender: boolean, enable: boolean) {
    const headers = this.headers;
    return this.http.put<User>(`${this.apiUserUrl}/${employeeId}`, 
      { name,email,phone,birthday,gender,enable}, {headers});
  }

  
  
}
