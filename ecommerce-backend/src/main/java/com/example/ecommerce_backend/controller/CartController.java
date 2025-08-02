package com.example.ecommerce_backend.controller;

import com.example.ecommerce_backend.model.CartItem;
import com.example.ecommerce_backend.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @GetMapping
    public ResponseEntity<List<CartItem>> getCartItems(Authentication auth) {
        String username = auth.getName();
        List<CartItem> items = cartItemRepository.findByUsername(username);
        return ResponseEntity.ok(items);
    }

    @PostMapping
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem item, Authentication auth) {
        item.setUsername(auth.getName());
        return ResponseEntity.ok(cartItemRepository.save(item));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long id) {
        cartItemRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(Authentication auth) {
        cartItemRepository.deleteByUsername(auth.getName());
        return ResponseEntity.ok().build();
    }
}
