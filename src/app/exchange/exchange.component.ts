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

  constructor(private exchangeService: ExchangeService) {}

  ngOnInit() {
    this.loadCurrencies();
  }

  loadCurrencies() {
    this.exchangeService.getCurrencies().subscribe((res) => {
      const allowed = ['USD', 'EUR', 'GBP', 'CNY', 'ILS'];
      this.currenciesMap = res.currencies;
      this.currencies = Object.keys(res.currencies).filter(c => allowed.includes(c));
      if (this.currencies.length > 0) {
        this.baseCurrency = this.currencies[0];
        this.loadRates(this.baseCurrency);
      }
    });
  }

  loadRates(base: string) {
    this.baseCurrency = base;
    this.exchangeService.getExchangeRates(base).subscribe((res) => {
      this.exchangeRates = [];
      for (const [currency, rate] of Object.entries(res.rates)) {
        if (currency !== base && this.currencies.includes(currency)) {
          this.exchangeRates.push({ currency, rate });
        }
      }
    });
  }

  getCurrencyName(code: string): string {
    return this.currenciesMap[code] ? `${code} - ${this.currenciesMap[code]}` : code;
  }
}
