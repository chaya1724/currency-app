import { Component, OnInit } from '@angular/core';
import { ExchangeService } from '../services/exchange.service';

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
  currenciesMap: Record<string, string> = {};
  currencies: string[] = [];
  baseCurrency = '';
  exchangeRates: ExchangeRate[] = [];
  displayedColumns = ['base', 'currency', 'rate'];
  errorMessage = '';
  loadingCurrencies = false;
  loadingRates = false;

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit() {
    this.loadCurrencies();
  }

  loadCurrencies() {
    this.errorMessage = '';
    this.loadingCurrencies = true;
    this.exchangeService.getCurrencies().subscribe({
      next: res => {
        this.loadingCurrencies = false;
        const allowed = ['USD', 'EUR', 'GBP', 'CNY', 'ILS'];
        this.currenciesMap = res.currencies || {};
        this.currencies = Object.keys(this.currenciesMap).filter(c => allowed.includes(c));
        if (this.currencies.length === 0) {
          this.errorMessage = 'No available currencies found in the list.';
          this.exchangeRates = [];
          this.baseCurrency = '';
          return;
        }
        this.baseCurrency = this.currencies[0];
        this.loadRates(this.baseCurrency);
      },
      error: err => {
        this.loadingCurrencies = false;
        this.errorMessage = 'Error loading currency list: ' + (err.message || err.statusText || 'Unknown error');
      }
    });
  }

  loadRates(base: string) {
    this.errorMessage = '';
    this.loadingRates = true;
    this.baseCurrency = base;
    this.exchangeService.getExchangeRates(base).subscribe({
      next: res => {
        this.loadingRates = false;
        if (!res || !res.rates) {
          this.errorMessage = 'Exchange rate data is not available.';
          this.exchangeRates = [];
          return;
        }
        this.exchangeRates = [];
        for (const [currency, rate] of Object.entries(res.rates)) {
          if (currency !== base && this.currencies.includes(currency)) {
            this.exchangeRates.push({ currency, rate });
          }
        }
      },
      error: err => {
        this.loadingRates = false;
        this.errorMessage = 'Error loading exchange rates: ' + (err.message || err.statusText || 'Unknown error');
      }
    });
  }

  getCurrencyName(code: string): string {
    return this.currenciesMap[code] ? `${code} - ${this.currenciesMap[code]}` : code;
  }
}
