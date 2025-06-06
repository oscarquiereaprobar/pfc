import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrl = 'http://localhost:8888/api/messages';

  constructor(private http: HttpClient) { }

  getByItinerary(itineraryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/itinerary/${itineraryId}`);
  }

  create(message: { text: string, idItinerary: number, idUser: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, message);
  }
}
