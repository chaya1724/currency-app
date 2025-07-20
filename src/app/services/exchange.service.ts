import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<{ currencies: Record<string, string> }> {
    return this.http.get<{ currencies: Record<string, string> }>(`${this.baseUrl}/currencies`);
  }

  getExchangeRates(base: string): Observable<{ rates: Record<string, number> }> {
    return this.http.get<{ rates: Record<string, number> }>(`${this.baseUrl}/${base}`);
  }
}
