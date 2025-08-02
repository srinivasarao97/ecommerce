 🛒 Full-Stack E-Commerce Application

This is a full-stack E-Commerce web application built with **React (Frontend)** and **Spring Boot (Backend)**. It supports user registration, JWT-based authentication, product listing, cart functionality, payments, and order history.

---

## 📁 Project Structure
Frontend:
    📁api
        axios.js
    📁components
        Navbar.jsx
    📁pages
        Cart.jsx
        Home.jsx
        Login.jsx
        OrderHistory.jsx
        Payment.jsx
        Product.jsx
        Register.jsx
    App.css
    App.jsx

Backend:
    📁config
        CorsConfig.java
        SecurityConfig.java
    📁controller
        AuthController.java
        ProductController.java
        PaymentController.java
        OrderHistoryController.java
    📁dto
        CartItemDTO.java
        LoginRequest.java
        RegisterRequest.java
    📁exception
        GlobalExceptionHandler.java
    📁model
        CartItem.java
        Order.java
        OrderItem.java
        Product.java
        User.java
    📁repository
        CartItemRepository.java
        OrderItemRepository.java
        OrderRepository.java
        UserRepository.java
        ProductRepository.java
    📁security
        JwtAuthenticationFilter.java
        JwtUtil.java
    📁service
        UserDetailsServiceImpl.java
        EcommerceBackendApplication.java

## 🚀 Features

### 👨‍💻 User Features
- Register & Login
- JWT Authentication
- Browse Products
- Add to Cart
- Checkout / Payment
- View Order History 


## 🧪 Technologies Used

### 💻 Frontend (React + Tailwind CSS)
- React.js
- Axios (for API calls)
- Tailwind CSS (UI design)
- React Router (routing)

### 🔧 Backend (Spring Boot)
- Java + Spring Boot
- Spring Security (JWT Authentication)
- MySQL (Database)
- JPA / Hibernate