import { Component, OnInit } from '@angular/core';
import { CurrencyApiService } from '../../services/currencyApiService';

@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html',
  styleUrls: ['./currency-table.component.css']
})
export class CurrencyTableComponent implements OnInit {

  rates: [string, number][] = [];
  displayedRates: [string, number][] = [];
  loading = false;

 filterText = '';

  pageSize = 5;
  index  = 0;
  constructor(private currencyService: CurrencyApiService) {}

  ngOnInit() {
     this.fetchRates();
  }
 private fetchRates(): void {
    this.currencyService.getLatestRates().subscribe({
      next: (res: any) => {
        console.log("res",res);
        this.rates = Object.entries(res.data.response.rates);
        console.log("this.rates ",this.rates);
        
        this.reset();
      },
      error: err => console.error('Failed to load rates', err)
    });
  }

 private reset(): void {
    this.index = 0;
    this.displayedRates = [];
    this.loadMore();
  }


 loadMore(): void {
    if (this.loading) return;

    this.loading = true;

    const filteredRates = this.getFilteredRates();
    const nextRates = filteredRates.slice(
      this.index,
      this.index + this.pageSize
    );

    this.displayedRates.push(...nextRates);
    this.index += this.pageSize;

    this.loading = false;
  }
  
  private getFilteredRates(): [string, number][] {
    const text = this.filterText.toLowerCase();

    return this.rates.filter(
      ([code, value]) =>
        code.toLowerCase().includes(text) ||
        value.toString().includes(text)
    );
  }

 
  onScroll(event: any) {
    const el = event.target;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
      this.loadMore();
    }
  }


  onFilterChange(): void {
    this.reset();
  }
}
