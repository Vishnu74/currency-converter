import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyApiService } from '../../services/currencyApiService';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  form!: FormGroup;
  currencies: { label: string; value: string }[] = [];
  result = 0;

  private destroy$ = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private currencyService: CurrencyApiService
  ) { }

  ngOnInit() {
    this.initForm();
    this.loadCurrencies();
    this.changeCurrency();
  }
  private initForm(): void {
    this.form = this.fb.group({
      amount: [1000, [Validators.required, Validators.min(1)]],
      from: ['USD'],
      to: ['INR']
    });
  }
  changeCurrency() {
    this.form.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.convert();
      });
  }

  loadCurrencies() {

    this.currencyService.getCurrencies().subscribe({
      next: (res: any) => {
        console.log(res);
        this.currencies = res.data.response.map((c: any) => ({
          label: `${c.short_code} – ${c.name}`,
          value: c.short_code
        }));
      },
      error: err => console.error(err)
    });

    this.convert();
  }


  convert() {
    if (this.form.invalid) return;
    const { amount, from, to } = this.form.value;
    this.currencyService.convert(from, to, amount)
      .subscribe((res: any) => {
        console.log(res);
        this.result = res.data.response.value;
        console.log("result", this.result);

      });
  }

  swap() {
    const { from, to } = this.form.value;
    this.form.patchValue({ from: to, to: from });
    this.convert();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
