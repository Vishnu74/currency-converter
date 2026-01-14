package com.example.currency_api.service;

import com.example.currency_api.Interface.CurrencyInterface;
import com.example.currency_api.config.RestTemplateConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class CurrencyServiceImp implements CurrencyInterface {

    @Value("${currency.api.base-url}")
    private String baseUrl;

    @Value("${currency.api.key}")
    private String apiKey;
    private final RestTemplate restTemplate;

    @Override
    public Object getCurrencies() {
        String url = baseUrl + "/currencies?api_key=" + apiKey;
        log.info("Calling GET /currencies");
        return restTemplate.getForObject(url, Object.class);
    }

    @Override
    public Object convert(String from, String to, double amount) {
        String url = baseUrl + "/convert?api_key=" + apiKey
                + "&from=" + from
                + "&to=" + to
                + "&amount=" + amount;
        log.info("Calling GET /convert");
        return restTemplate.getForObject(url, Object.class);
    }
    @Override
    public Object getLatestRates() {
        String url = baseUrl + "/latest?api_key=" + apiKey;
        log.info("Calling GET /latest");
        return restTemplate.getForObject(url, Object.class);
    }
}
