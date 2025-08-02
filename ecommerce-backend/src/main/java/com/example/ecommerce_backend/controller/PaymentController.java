package com.example.ecommerce_backend.controller;
import com.example.ecommerce_backend.dto.CartItemDTO;
import com.example.ecommerce_backend.model.Order;
import com.example.ecommerce_backend.model.OrderItem;
import com.example.ecommerce_backend.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/checkout")
    public ResponseEntity<?> processPayment(
            Authentication auth,
            @RequestBody Map<String, List<CartItemDTO>> payload) {

        System.out.println("Authorization Header: " + auth.getName());
        if (auth == null || auth.getName() == null) {
            return ResponseEntity.status(403).body("Unauthorized request.");
        }
        String username = auth.getName();
        List<CartItemDTO> cartItems = payload.get("cartItems");

        if (cartItems == null || cartItems.isEmpty()) {
            return ResponseEntity.badRequest().body("Cart is empty. Cannot proceed with checkout.");
        }

        Order order = new Order();
        order.setUsername(username);
        order.setOrderDate(Timestamp.valueOf(LocalDateTime.now()));

        double total = 0.0;
        List<OrderItem> orderItems = new ArrayList<>();

        for (CartItemDTO dto : cartItems) {
            OrderItem item = new OrderItem();
            item.setProductName(dto.getProductName());
            item.setPrice(dto.getPrice());
            item.setQuantity(1);
            item.setOrder(order);

            orderItems.add(item);
            total += dto.getPrice();
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Payment successful! Your order has been placed.");
        response.put("orderId", savedOrder.getId());
        response.put("totalAmount", savedOrder.getTotalAmount());
        response.put("orderDate", savedOrder.getOrderDate());
        response.put("items", savedOrder.getOrderItems());

        return ResponseEntity.ok(response);
    }
}
