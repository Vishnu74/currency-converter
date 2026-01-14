package com.example.currency_api.Interface;

public interface CurrencyInterface {
    Object getCurrencies();

    Object convert(String from, String to, double amount);

    Object getLatestRates();
}
