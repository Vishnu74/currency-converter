package com.example.currency_api.globalexception;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.ResponseErrorHandler;

import java.io.IOException;


@Slf4j
public class RestTemplateErrorHandler extends DefaultResponseErrorHandler {

    @Override
    public void handleError(
            ClientHttpResponse response) throws IOException {

        HttpStatus status =
                HttpStatus.valueOf(response.getStatusCode().value());

        switch (status) {

            case UNAUTHORIZED ->
                    throw new CurrencyApiException(
                            "Invalid or inactive API key", HttpStatus.UNAUTHORIZED);

            case FORBIDDEN ->
                    throw new CurrencyApiException(
                            "Access forbidden for this API", HttpStatus.FORBIDDEN);

            case NOT_FOUND ->
                    throw new CurrencyApiException(
                            "API endpoint not found", HttpStatus.NOT_FOUND);

            case TOO_MANY_REQUESTS ->
                    throw new CurrencyApiException(
                            "API rate limit exceeded", HttpStatus.TOO_MANY_REQUESTS);

            default ->
                    throw new CurrencyApiException(
                            "Currency service temporarily unavailable",
                            HttpStatus.BAD_GATEWAY);
        }
    }
}

