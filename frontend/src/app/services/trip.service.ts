import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TripService {
  private apiUrl = 'http://localhost:8888/api/trips';

  constructor(private http: HttpClient) {}

  getByItineraryId(itineraryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/itinerary/${itineraryId}`);
  }

  getById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(itineraryId: number, trip: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/itinerary/${itineraryId}`, trip);
  }

  update(id: number, trip: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, trip);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

