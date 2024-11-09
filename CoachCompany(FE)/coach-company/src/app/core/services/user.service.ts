import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { User } from 'ckeditor5-premium-features';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  private apiUserUrl = "http://localhost:8080/api/users";
  private user: User | undefined;
  userStatusChanged: EventEmitter<User | undefined> = new EventEmitter();

  constructor(private http:HttpClient) {
    this.loadUserStatus();
  }

  // Set dữ liệu user sao khi đăng nhập
  setUser(user: User){
    this.user = user;
    this.saveUserStatus();
    this.userStatusChanged.emit(this.user)
  }

  getUser(){
    return this.user;
  }

  // lưu dữ liệu user sau khi đăng nhập
  private saveUserStatus() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  // load lại dữ liệu user đã lưu trong localStorage
  private loadUserStatus() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.user = JSON.parse(savedUser);
      this.userStatusChanged.emit(this.user);
    }
  }

  // Dành cho tính năng quên mật khẩu
  // Lưu mail khi lâý lại mật khẩu
  saveEmailToVerifyCode(email:string){
    localStorage.setItem('emailToVerify',email);
  }

  getEmailToVerifyCode(){
    return localStorage.getItem('emailToVerify');
  }

  // xóa dữ liệu user
  clearUser(){
    this.user = undefined;
    localStorage.removeItem('user');
    this.userStatusChanged.emit(this.user);
  }

  // Gửi mã lấy lại mật khẩu 
  sendVerificationCode(email: string):   Observable<any> { 
    return this.http.post(`${this.apiUserUrl}/send-verification-code`, 
      { email});
  }

  // Xác thực mã
  verifyCode(email:string, code:string): Observable<any> {
    return this.http.post(`${this.apiUserUrl}/verify-code`, 
      { email, code});
  }

  // Nhập mật khẩu mới
  resetPassword(email:string, password:string): Observable<any>{
    return this.http.put(`${this.apiUserUrl}/reset-password`, 
      { email, password});
  }



  ngOnDestroy(): void {
    this.clearUser();
  }
}
