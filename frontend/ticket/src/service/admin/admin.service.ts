import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl= 'http://localhost:8085/api/admin/'
  // private corsHeaders: HttpHeaders;
 
   constructor(private http: HttpClient) { 
     
   }
 
   verifyLogin(username: String,mdp:String): Observable<any> {
    const url = `${this.apiUrl}exist/${username}/${mdp}`;
    console.log("url: "+url);
    return this.http.get(url);
  }
 
}
