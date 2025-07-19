// exchange-rates.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ExchangeRate {
  currency: string;
  rate: number;
}

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {
  currencies = ['USD', 'EUR', 'GBP', 'CNY', 'ILS'];
  baseCurrency = 'USD';
  exchangeRates: ExchangeRate[] = [];
  displayedColumns = ['base', 'currency', 'rate'];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadRates(this.baseCurrency);
  }

  loadRates(base: string) {
    this.baseCurrency = base;
    this.http
      .get<{ rates: Record<string, number> }>(
        `https://localhost:44353/api/Exchange/${base}`
      )
      .subscribe((res) => {
        this.exchangeRates = [];
        for (const [currency, rate] of Object.entries(res.rates)) {
          if (currency !== base && this.currencies.includes(currency)) {
            this.exchangeRates.push({ currency, rate });
          }
        }
      });
  }
}
