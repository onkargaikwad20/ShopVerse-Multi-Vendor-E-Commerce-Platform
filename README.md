# ShopVerse – Multi-Vendor E-Commerce Platform

ShopVerse is a **production-grade, multi-vendor e-commerce platform** built using a **microservices architecture**.  
It supports **user authentication**, **seller onboarding**, **product management**, **admin moderation**, **order processing**, **online payments**, and **email notifications**.

The system is designed to reflect **real-world enterprise backend architecture**, similar to platforms like **Amazon** and **Shopify**.


## Project Structure

9_SHOPVERSE – MULTI-VENDOR E-COMMERCE PLATFORM
│
├── Backend
│ ├── api-gateway
│ ├── auth-service
│ ├── user-service
│ ├── seller-service
│ ├── product-service
│ ├── admin-service
│ ├── order-service
│ ├── payment-service
│ └── notification-service
│
├── frontend
│
├── Project Report.pdf
└── README.md


---

## Architecture Overview

### Architecture Type
- Microservices Architecture
- API Gateway Pattern
- Event-Driven Architecture (Kafka)
- Stateless JWT-based Security

### High-Level Flow

Frontend (React)
|
v
API Gateway
|
| Auth | User | Seller | Product | Order | Admin |
    |
  Kafka
    |


Payment Service
Notification Service



---

## 🧩 Backend – Microservices Overview

| Service | Port | Responsibility |
|-------|------|---------------|
| API Gateway | 8080 | Routing, JWT validation |
| Auth Service | 8081 | Authentication, JWT, roles |
| User Service | 8082 | User profile management |
| Seller Service | 8083 | Seller onboarding, KYC |
| Product Service | 9000 | Product & category management |
| Admin Service | 8090 | Admin approvals & moderation |
| Order Service | 8086 | Cart & order management |
| Payment Service | 8087 | Stripe payment processing |
| Notification Service | 8096 | Email notifications |

---

## Security Design

- JWT-based authentication
- Stateless services
- Role-based access control (USER / SELLER / ADMIN)
- Centralized authentication via Auth Service
- API Gateway validates JWT and injects trusted headers
- Internal service communication secured

---

## Application Flow

### 1️ Authentication Flow
- User registers/logs in via Auth Service
- JWT token is generated
- Token contains `userId` and `role`


### 2️ API Gateway Flow
- Intercepts all incoming requests
- Validates JWT token
- Extracts user details
- Forwards request to respective microservice


### 3️ Seller Onboarding Flow
- User creates seller profile
- Admin verifies seller (KYC)
- Seller role is approved
- Seller can create shop and products


### 4️ Product Management Flow
- Seller adds products
- Products remain **PENDING**
- Admin approves or rejects products
- Approved products become visible to users


### 5️ Order & Payment Flow
- User places an order
- Order Service creates order
- Kafka event is published
- Payment Service processes payment using Stripe
- Order status is updated after payment
- Notification Service sends confirmation email


## Database Design

Each microservice follows the **Database-per-Service** pattern.

| Service | Database |
|------|---------|
| Auth | auth_db |
| User | user_db |
| Seller | seller_db |
| Product | product_db |
| Order | order_db |


## Frontend (React)

The frontend is built using **React.js** and provides a role-based user interface.

### Supported Roles
- **Users** – Browse products, cart, checkout, orders
- **Sellers** – Manage products, view orders
- **Admins** – Approve sellers and products

###  Frontend Features
- JWT-based authentication
- Role-based dashboards
- Product listing and search
- Cart and checkout flow
- Admin approval panels

###  Run Frontend
```bash
cd frontend
npm install
npm start dev


### How to Run Backend
    
## Prerequisites
    Java 17
    Maven
    MySQL
    Apache Kafka
    Redis


## Run Services (Recommended Order)
    auth-service
    api-gateway
    user-service
    seller-service
    product-service
    admin-service
    order-service
    payment-service
    notification-service

### Tech Stack

## Backend

    Java 17
    Spring Boot
    Spring Security
    Spring Cloud Gateway
    Spring Data JPA
    Apache Kafka
    MySQL
    Redis
    Stripe API
    Maven


## Frontend

    React.js
    HTML, CSS, JavaScript

Axios

### Design Principles & Patterns

    SOLID Principles
    Separation of Concerns
    API Gateway Pattern
    Event-Driven Architecture
    Database-per-Service Pattern
    Stateless Authentication
    Clean Layered Architecture

### Project Documentation

Detailed documentation and diagrams are available in Project Report.pdf