import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../../Modules/dto/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiContactsUrl = "http://localhost:8080/api/contacts";
  private contactList!: Contact[];
  contactListChanged: EventEmitter<Contact[] | undefined> = new EventEmitter();
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  constructor(private http:HttpClient) {
    this.loadContactsList();
  }

  getContacts(): Observable<Contact[]>{
    const headers = this.headers;
    return this.http.get<Contact[]>(`${this.apiContactsUrl}`, {headers});
  }

  setContactList(contactList: Contact[]){
    this.contactList = contactList;
    this.saveContactsListStatus();
    this.contactListChanged.emit(this.contactList)
  }
  
  private saveContactsListStatus() {
    localStorage.setItem('contactList', JSON.stringify(this.contactList));
  }

  loadContactsList(){
    const savedContactList = localStorage.getItem('contactList');
    if (savedContactList) {
      this.contactList = JSON.parse(savedContactList);
      this.contactListChanged.emit(this.contactList);
    }
  }

  getContactsList(): Contact[] {
    const savedContactList =  localStorage.getItem('contactList') 
    return savedContactList ? JSON.parse(savedContactList) : [];
  }

  getContactById(id: number): Contact | undefined{
    return this.getContactsList().find(news => news.id == id);
  }

  getContactByIdAPI(id: number): Observable<Contact>{
    const headers = this.headers;
    return this.http.get<Contact>(`${this.apiContactsUrl}/${id}`, {headers});
  }

  // addContacts(user_id: number,title: string,description: string,content: string,img: File): Observable<Contact>{
  //   const formData: FormData = new FormData(); 
  //   formData.append('title', title); 
  //   formData.append('description', description); 
  //   formData.append('content', content); 
  //   formData.append('user_id', user_id.toString()); 
  //   if(img){
  //     formData.append('img', img, img.name);
  //   };
  //   const headers = this.headers;
  //   return this.http.post<Contact>(`${this.apiContactsUrl}`, 
  //     formData, {headers});
  // }
  // processContact(contact_id: number,processor_id: number,name_sender: string,phone_sender: string,email_sender: string,address_sender: string,message_sender: string,job_sender: string, message_processor: string): Observable<Contact>{


  processContact(contact_id: number,processor_id: number, message_processor: string,email_sender: string): Observable<Contact>{
    const formData: FormData = new FormData(); 
    // formData.append('name_sender', name_sender); 
    // formData.append('phone_sender', phone_sender); 
    // formData.append('address_sender', address_sender); 
    // formData.append('message_sender', message_sender); 
    // formData.append('job_sender', job_sender); 
    formData.append('email_sender', email_sender); 
    formData.append('message_processor', message_processor); 
    formData.append('processor_id', processor_id.toString()); 
    const headers = this.headers;
    return this.http.put<Contact>(`${this.apiContactsUrl}/${contact_id}`, 
      formData, {headers});
  }
}
