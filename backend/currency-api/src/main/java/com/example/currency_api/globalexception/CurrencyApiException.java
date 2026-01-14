package com.example.currency_api.globalexception;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class CurrencyApiException extends RuntimeException{

    private final HttpStatus status;

    public CurrencyApiException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
