import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TransportService {
  
  private apiUrl = 'http://localhost:8888/api/transports';

  constructor(private http: HttpClient) {}

  getAllTransports(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteTransport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getTransportById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTransport(transport: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, transport);
  }

  updateTransport(id: number, transport: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, transport);
  }

  getTransport(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
