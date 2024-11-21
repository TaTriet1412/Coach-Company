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

  createContact(name: string, email: string, phone: string, address: string,job: string,message: string){
    const formData: FormData = new FormData(); 
    formData.append('name', name); 
    formData.append('phone', phone); 
    formData.append('address', address); 
    formData.append('message', message); 
    formData.append('job', job); 
    formData.append('email', email); 
    const headers = this.headers;
    return this.http.post<Contact>(`${this.apiContactsUrl}`, 
      formData, {headers});
  }

  processContact(contact_id: number,processor_id: number, message_processor: string,email_sender: string): Observable<Contact>{
    const formData: FormData = new FormData(); 
    formData.append('email_sender', email_sender); 
    formData.append('message_processor', message_processor); 
    formData.append('processor_id', processor_id.toString()); 
    const headers = this.headers;
    return this.http.put<Contact>(`${this.apiContactsUrl}/${contact_id}`, 
      formData, {headers});
  }
}
