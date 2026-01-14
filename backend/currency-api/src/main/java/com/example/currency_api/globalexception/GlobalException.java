package com.example.currency_api.globalexception;

import com.example.currency_api.response.CommonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(CurrencyApiException.class)
    public ResponseEntity<CommonResponse<Object>> handleCurrencyApiException(
            CurrencyApiException ex) {

        log.error("Currency API Error: {}", ex.getMessage());

        return ResponseEntity
                .status(ex.getStatus())
                .body(new CommonResponse<>(
                        ex.getStatus().value(),
                        ex.getMessage(),
                        null
                ));
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<CommonResponse<Object>> handleGenericException(
            Exception ex) {

        log.error("Unhandled exception", ex);

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new CommonResponse<>(
                        500,
                        "Internal server error",
                        null
                ));
    }
}
