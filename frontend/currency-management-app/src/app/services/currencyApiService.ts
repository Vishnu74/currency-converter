import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from "@angular/common/http";
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {
   
  private BASE_URL = environment.apiBaseUrl;
  
    
  constructor(private http: HttpClient) {}

  getCurrencies() {
    return this.http.get<any>(`${this.BASE_URL}/currencies`);
  }
    convert(from: string, to: string, amount: number) {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('amount', amount);

    return this.http.get<any>(`${this.BASE_URL}/convert`, { params });
  }
   getLatestRates(base?: string, symbols?: string) {
    let params = new HttpParams();

    if (base) params = params.set('base', base);
    if (symbols) params = params.set('symbols', symbols);

    return this.http.get<any>(`${this.BASE_URL}/latest`, { params });
  }

}