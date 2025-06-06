import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private apiUrl = 'https://countriesnow.space/api/v0.1';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/countries/positions`);
  }

  getCities(country: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/countries/cities`, { country });
  }
}
