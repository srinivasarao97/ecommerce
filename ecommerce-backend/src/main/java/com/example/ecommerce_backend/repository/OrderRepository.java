package com.example.ecommerce_backend.repository;

import com.example.ecommerce_backend.model.Order;
import com.example.ecommerce_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUsername(String username);
}
