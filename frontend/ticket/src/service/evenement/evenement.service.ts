import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/api-config';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

  private apiUrl= 'http://localhost:8082/api/event'
  constructor(private http: HttpClient) { }

  addEvenement(EvenementData: any): Observable<any> {
    const url = `${this.apiUrl}/ajouter`;
    console.log("Last event Object")
    console.log(EvenementData)
    return this.http.post(url, EvenementData);
  }

  updateEvenement(EvenementData: any): Observable<any> {
    const url = `${this.apiUrl}/modifier`;
    console.log(EvenementData)
    return this.http.put(url, EvenementData);
  }

  deleteEvenement(idEvenement: number): Observable<any> {
    const url = `${this.apiUrl}/supprimer/${idEvenement}`;
    return this.http.delete(url);
  }


  getAllEvenement(pageNumber: number,sizePage:number): Observable<any> {

    
    const url = `${this.apiUrl}/all/${pageNumber}/${sizePage}`;
    console.log("url: "+url);
    return this.http.get(url);
  }
  getAllEvenementList(): Observable<any> {

    
    const url = `${this.apiUrl}`;
    console.log("url: "+url);
    return this.http.get(url);
  }
}
