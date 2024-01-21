import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/api-config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl= 'http://localhost:8080/api/client'
 // private corsHeaders: HttpHeaders;

  constructor(private http: HttpClient) { 
    
  }

  addClient(ClientData: any): Observable<any> {
    const url = `${this.apiUrl}`;
    console.log(ClientData)
    return this.http.post(url, ClientData);
  }

  updateClient(ClientData: any): Observable<any> {
    const url = `${this.apiUrl}`;
    console.log(ClientData)
    return this.http.put(url, ClientData);
  }

  deleteClient(idCient: number): Observable<any> {
    const url = `${this.apiUrl}/${idCient}`;
    return this.http.delete(url);
  }
  getAllClient(pageNumber: number,sizePage:number): Observable<any> {

    
    const url = `${this.apiUrl}/${pageNumber}/${sizePage}`;
    console.log("url: "+url);
    return this.http.get(url);
  }

  getAllClientList(): Observable<any> {

    const url = `${this.apiUrl}/list`;
    console.log("url: "+url);
    return this.http.get(url);
  }

}
