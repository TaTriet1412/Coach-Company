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


  addDriver(name: string, email: string, phone: string, birthday: string, gender: boolean,img: File) {
    const role = 3;
    const formData: FormData = new FormData(); 
    formData.append('name', name); 
    formData.append('email', email); 
    formData.append('phone', phone); 
    formData.append('birthday', birthday); 
    formData.append('gender', gender.toString()); 
    formData.append('role', role.toString());
    if(img){
      formData.append('img', img, img.name);
    } 
    const headers = this.headers;
    return this.http.post<User>(`${this.apiUserUrl}`, 
      formData, {headers});
  }

  addStaff(name: string, email: string, phone: string, birthday: string, gender: boolean,img: File) {
    const role = 2;
    const formData: FormData = new FormData(); 
    formData.append('name', name); 
    formData.append('email', email); 
    formData.append('phone', phone); 
    formData.append('birthday', birthday); 
    formData.append('gender', gender.toString()); 
    formData.append('role', role.toString());
    if(img){
      formData.append('img', img, img.name);
    } 
    const headers = this.headers;
    return this.http.post<User>(`${this.apiUserUrl}`, 
      formData, {headers});
  }

  addCoDriver(name: string, email: string, phone: string, birthday: string, gender: boolean,img: File) {
    const role = 4;
    const formData: FormData = new FormData(); 
    formData.append('name', name); 
    formData.append('email', email); 
    formData.append('phone', phone); 
    formData.append('birthday', birthday); 
    formData.append('gender', gender.toString()); 
    formData.append('role', role.toString());
    if(img){
      formData.append('img', img, img.name);
    } 
    const headers = this.headers;
    return this.http.post<User>(`${this.apiUserUrl}`, 
      formData, {headers});
  
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

  getUserById(id: number): User | undefined{
    return this.getUserListCurrent().find(user => user.id == id);
  }

  updateDriver(id: number,name: string, email: string, phone: string, birthday: string, gender: boolean, enable: boolean,img: File) {
    const formData: FormData = new FormData(); 
    formData.append('name', name); 
    formData.append('email', email); 
    formData.append('phone', phone); 
    formData.append('birthday', birthday); 
    formData.append('gender', gender.toString()); 
    formData.append('enable', enable.toString()); 
    if(img){
      formData.append('img', img, img.name);
    } 
    const headers = this.headers;
    return this.http.put<User>(`${this.apiUserUrl}/${id}`, 
      formData, {headers});
  }

  updateCoDriver(id: number,name: string, email: string, phone: string, birthday: string, gender: boolean, enable: boolean,img: File) {
    const formData: FormData = new FormData(); 
    formData.append('name', name); 
    formData.append('email', email); 
    formData.append('phone', phone); 
    formData.append('birthday', birthday); 
    formData.append('gender', gender.toString()); 
    formData.append('enable', enable.toString()); 
    if(img){
      formData.append('img', img, img.name);
    } 
    const headers = this.headers;
    return this.http.put<User>(`${this.apiUserUrl}/${id}`, 
      formData, {headers});
  }

  updateStaff(id: number, name: string, email: string, phone: string, birthday: string, gender: boolean, enable: boolean,img: File) {
    const formData: FormData = new FormData(); 
    formData.append('name', name); 
    formData.append('email', email); 
    formData.append('phone', phone); 
    formData.append('birthday', birthday); 
    formData.append('gender', gender.toString()); 
    formData.append('enable', enable.toString()); 
    if(img){
      formData.append('img', img, img.name);
    } 
    const headers = this.headers;
    return this.http.put<User>(`${this.apiUserUrl}/${id}`, 
      formData, {headers});
  }

  
  
}
