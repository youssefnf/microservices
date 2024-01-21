import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from 'src/api-config';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl= 'http://localhost:8083/api/reservation'
  constructor(private http: HttpClient) { }

  addReservation(ReservationData: any): Observable<any> {
    const url = `${this.apiUrl}/ajouter`;
    console.log("Last reservation Object")
    console.log(ReservationData)
    return this.http.post(url, ReservationData);
  }

  updateReservation(ReservationData: any): Observable<any> {
    const url = `${this.apiUrl}/modifier`;
    console.log(ReservationData)
    return this.http.put(url, ReservationData);
  }

  deleteReservation(idEvenement: number): Observable<any> {
    const url = `${this.apiUrl}/supprimer/${idEvenement}`;
    return this.http.delete(url);
  }


  getAllReservation(pageNumber: number,sizePage:number): Observable<any> {

    
    const url = `${this.apiUrl}/all/${pageNumber}/${sizePage}`;
    console.log("url: "+url);
    return this.http.get(url);
  }
}
