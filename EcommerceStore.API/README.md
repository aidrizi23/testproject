# Ecommerce Store API

A professional .NET 8 Web API for e-commerce applications with JWT authentication, Entity Framework Core, and comprehensive product, cart, and order management.

## Features

- **JWT Authentication**: Secure token-based authentication
- **Product Management**: Full CRUD operations with categories
- **Shopping Cart**: Real-time cart management
- **Order Processing**: Complete order lifecycle
- **User Management**: Profile and address management
- **Review System**: Product reviews and ratings
- **Admin Panel**: Administrative endpoints
- **AutoMapper**: DTO mapping
- **Swagger**: API documentation

## Tech Stack

- .NET 8.0
- Entity Framework Core 8.0
- SQL Server
- JWT Bearer Authentication
- AutoMapper 12.0
- BCrypt.Net
- Swagger/OpenAPI

## Getting Started

### Prerequisites

- .NET 8 SDK
- SQL Server

### Installation

1. Restore packages:
```bash
dotnet restore
```

2. Update connection string in `appsettings.json`

3. Run migrations:
```bash
dotnet ef database update
```

4. Run the application:
```bash
dotnet run
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/change-password` - Change password

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/{id}` - Update category (Admin)
- `DELETE /api/categories/{id}` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/{id}` - Update cart item
- `DELETE /api/cart/items/{id}` - Remove cart item
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create order
- `PATCH /api/orders/{id}/status` - Update order status (Admin)

### Users
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update profile
- `GET /api/users/me/addresses` - Get addresses
- `POST /api/users/me/addresses` - Add address
- `PUT /api/users/me/addresses/{id}` - Update address
- `DELETE /api/users/me/addresses/{id}` - Delete address

### Reviews
- `GET /api/reviews/product/{productId}` - Get product reviews
- `POST /api/reviews` - Create review
- `DELETE /api/reviews/{id}` - Delete review

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer {token}
```

## Default Admin Account

- Email: admin@ecommerce.com
- Password: Admin123!

## Database Schema

### Core Tables
- Users
- Products
- Categories
- ProductImages
- Carts
- CartItems
- Orders
- OrderItems
- Addresses
- Reviews

## Configuration

Update `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Your connection string"
  },
  "JwtSettings": {
    "SecretKey": "Your secret key (32+ characters)",
    "Issuer": "EcommerceStoreAPI",
    "Audience": "EcommerceStoreClient",
    "ExpirationHours": "24"
  }
}
```

## License

MIT
