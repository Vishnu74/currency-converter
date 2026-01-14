package com.example.currency_api.controller;

import com.example.currency_api.Interface.CurrencyInterface;
import com.example.currency_api.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Slf4j
public class CurrencyController {
    private final CurrencyInterface currencyInterface;

    @GetMapping("/currencies")
    public CommonResponse<Object> getCurrencies() {
        log.info("getCurrencies Method Enters");
        Object data = currencyInterface.getCurrencies();
        return new CommonResponse<>(200, "Success", data);
    }

    @GetMapping("/convert")
    public CommonResponse<Object> convert(
            @RequestParam String from,
            @RequestParam String to,
            @RequestParam double amount) {
        log.info("Convert API HITS !!!");
        Object data = currencyInterface.convert(from, to, amount);

        return new CommonResponse<>(200, "Success", data);
    }

    @GetMapping("/latest")
    public CommonResponse<Object> getLatestRates() {
        log.info("LATEST API HITS !!!");

        Object data = currencyInterface.getLatestRates();
        return new CommonResponse<>(200, "Success", data);
    }

}
