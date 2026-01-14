package com.example.currency_api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommonResponse<T> {
    private int statusCode;
    private String message;
    private T data;
}
