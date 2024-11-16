import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { User } from 'ckeditor5-premium-features';
import { response } from 'express';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy{
  private apiUserUrl = "http://localhost:8080/api/users";
  private user: User | undefined;
  // Hiển thị các nhân sự
  userStatusChanged: EventEmitter<User | undefined> = new EventEmitter();
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  
  constructor(private http:HttpClient) {
    this.loadUserStatus();
  }

  // -------------Tai Khoan va mat khau

  loginAccount(user: { email: string, password: string }){
    const headers = this.headers;
    return this.http.post(`${this.apiUserUrl}/login`, 
      user, {headers});
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
    const headers = this.headers;
    this.saveEmailToVerifyCode(email);
    return this.http.post(`${this.apiUserUrl}/send-verification-code`, 
      { email}, {headers});
  }

  // Gửi lại mã 
  resendCode(): void {
    const email = this.getEmailToVerifyCode();
    if(email){
      this.sendVerificationCode(email).subscribe({
        next: (response: any) => {
          console.log("Code resent successfully!",response)
        },
        error: (response: any) => {
          console.error('Error to resend code', response.error)
        }
      });
    }else {
      console.error("No mail to resend verification code!")
    }
  }

  // Xác thực mã
  verifyCode(email:string, code:string): Observable<any> {
    const headers = this.headers;
    return this.http.post(`${this.apiUserUrl}/verify-code`, 
      { email, code}, {headers});
  }

  // Nhập mật khẩu mới
  resetPassword(email:string, password:string): Observable<any>{
    const headers = this.headers;
    return this.http.put(`${this.apiUserUrl}/reset-password`, 
      { email, password}, {headers});
  }


  ngOnDestroy(): void {
    this.clearUser();
  }
}
