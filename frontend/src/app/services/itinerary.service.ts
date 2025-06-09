import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ItineraryService {

  private apiUrl = 'http://localhost:8888/api/itineraries';

  constructor(private http: HttpClient) {}

  getByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getPublicItineraries(userId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/public/${userId}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(userId: number, itinerary: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/${userId}`, itinerary);
  }

  update(id: number, itinerary: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, itinerary);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
