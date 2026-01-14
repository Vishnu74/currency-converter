import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ConverterComponent } from './components/converter/converter.component';
import { CurrencyTableComponent } from './components/currency-table/currency-table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GlobalLoaderComponent } from './shared/global-loader/global-loader.component';
import { LoaderInterceptor } from './shared/global-loader/loader.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    CurrencyTableComponent,
    GlobalLoaderComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
