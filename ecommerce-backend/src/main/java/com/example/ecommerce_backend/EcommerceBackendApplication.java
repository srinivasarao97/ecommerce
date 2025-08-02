package com.example.ecommerce_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.example.ecommerce_backend")
public class EcommerceBackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(EcommerceBackendApplication.class, args);
	}

}
