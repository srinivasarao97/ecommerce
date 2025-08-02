package com.example.ecommerce_backend.controller;

import com.example.ecommerce_backend.model.Order;
import com.example.ecommerce_backend.model.User;
import com.example.ecommerce_backend.repository.OrderRepository;
import com.example.ecommerce_backend.repository.UserRepository;
import com.example.ecommerce_backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderHistoryController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/history")
    public ResponseEntity<?> getOrderHistory(Authentication auth) {
        String username = auth.getName(); // Logged-in user's username
        List<Order> orders = orderRepository.findByUsername(username); // ✔️ call correct method
        return ResponseEntity.ok(orders);
    }
}
