import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from '../../Modules/dto/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiNewsUrl = "http://localhost:8080/api/newses";
  private newsList!: News[];
  newsListChanged: EventEmitter<News[] | undefined> = new EventEmitter();
  username = "triet"
  password = "123"
  headers = new HttpHeaders({ 'Authorization': 'Basic ' + btoa(`${this.username}:${this.password}`) });
  constructor(private http:HttpClient) {
    this.loadNewsList();
  }

  getNewses(): Observable<News[]>{
    const headers = this.headers;
    return this.http.get<News[]>(`${this.apiNewsUrl}`, {headers});
  }

  setnewsList(newsList: News[]){
    this.newsList = newsList;
    this.saveNewsListStatus();
    this.newsListChanged.emit(this.newsList)
  }
  
  private saveNewsListStatus() {
    localStorage.setItem('newsList', JSON.stringify(this.newsList));
  }

  loadNewsList(){
    const savedNewsList = localStorage.getItem('newsList');
    if (savedNewsList) {
      this.newsList = JSON.parse(savedNewsList);
      this.newsListChanged.emit(this.newsList);
    }
  }

  getNewsList(): News[] {
    const savedNewsList =  localStorage.getItem('newsList') 
    return savedNewsList ? JSON.parse(savedNewsList) : [];
  }

  getNewsById(id: number): News | undefined{
    return this.getNewsList().find(news => news.id == id);
  }

  getNewsByIdAPI(id: number): Observable<News>{
    const headers = this.headers;
    return this.http.get<News>(`${this.apiNewsUrl}/${id}`, {headers});
  }

  deleteNews(id: number): Observable<void>{
    const headers = this.headers;
    return this.http.delete<void>(`${this.apiNewsUrl}/${id}`, {headers});
  }

  addNews(user_id: number,title: string,description: string,content: string,img: File): Observable<News>{
    const formData: FormData = new FormData(); 
    formData.append('title', title); 
    formData.append('description', description); 
    formData.append('content', content); 
    formData.append('user_id', user_id.toString()); 
    if(img){
      formData.append('img', img, img.name);
    };
    const headers = this.headers;
    return this.http.post<News>(`${this.apiNewsUrl}`, 
      formData, {headers});
  }

  updateNews(newsId: number,user_id: number,title: string,description: string,content: string,img: File,enable: boolean): Observable<News>{
    const formData: FormData = new FormData(); 
    formData.append('title', title); 
    formData.append('description', description); 
    formData.append('content', content); 
    formData.append('user_id', user_id.toString()); 
    formData.append('enable', enable.toString()); 
    if(img){
      formData.append('img', img, img.name);
    };
    const headers = this.headers;
    return this.http.put<News>(`${this.apiNewsUrl}/${newsId}`, 
      formData, {headers});
  }
}
