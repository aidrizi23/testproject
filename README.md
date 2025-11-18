# E-Commerce Store - Full Stack Application

A modern, full-featured e-commerce platform built with .NET 8 Web API and Next.js 14.

## 🚀 Features

### Backend (.NET API)
- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Product Management**: Complete CRUD operations for products with categories
- **Shopping Cart**: Real-time cart management with inventory tracking
- **Order Processing**: Full order lifecycle management
- **User Profiles**: User account management with addresses
- **Review System**: Product reviews and ratings
- **Admin Panel**: Administrative features for product and order management

### Frontend (Next.js)
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Responsive Design**: Fully responsive and mobile-optimized
- **State Management**: Zustand for efficient client-side state management
- **Authentication**: Secure user authentication with JWT tokens
- **Product Browsing**: Advanced search, filtering, and sorting
- **Shopping Experience**: Intuitive cart and checkout flow
- **User Dashboard**: Order history and account management
- **Smooth Animations**: Framer Motion for enhanced UX

## 📁 Project Structure

```
├── EcommerceStore.API/          # .NET Web API Backend
│   ├── Controllers/             # API Controllers
│   ├── Models/                  # Entity Models
│   ├── DTOs/                    # Data Transfer Objects
│   ├── Services/                # Business Logic Layer
│   ├── Interfaces/              # Service Interfaces
│   ├── Data/                    # DbContext and Migrations
│   ├── Helpers/                 # Utility Classes (JWT, AutoMapper)
│   └── Middleware/              # Custom Middleware
│
└── ecommerce-store-frontend/    # Next.js Frontend
    ├── app/                     # Next.js App Router Pages
    ├── components/              # React Components
    │   └── ui/                  # shadcn/ui Components
    ├── lib/                     # Utilities and API Client
    ├── hooks/                   # Custom React Hooks
    └── types/                   # TypeScript Type Definitions
```

## 🛠️ Technologies Used

### Backend
- .NET 8.0
- Entity Framework Core
- SQL Server
- JWT Authentication
- AutoMapper
- BCrypt.Net
- Swagger/OpenAPI

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand (State Management)
- Axios
- Framer Motion
- Lucide Icons

## 📋 Prerequisites

- .NET 8 SDK
- Node.js 18+ and npm
- SQL Server (or SQL Server Express)

## 🚦 Getting Started

### Backend Setup

1. Navigate to the API directory:
```bash
cd EcommerceStore.API
```

2. Update the connection string in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=EcommerceStore;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

3. Install dependencies and run migrations:
```bash
dotnet restore
dotnet ef database update
```

4. Run the API:
```bash
dotnet run
```

The API will be available at `https://localhost:5001` (or `http://localhost:5000`)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd ecommerce-store-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL in `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 👤 Default Credentials

The database is seeded with a default admin account:
- **Email**: admin@ecommerce.com
- **Password**: Admin123!

## 📚 API Documentation

Once the API is running, access the Swagger documentation at:
- https://localhost:5001/swagger (or http://localhost:5000/swagger)

## 🔑 Key Features Implemented

### Product Management
- Product listing with search, filters, and sorting
- Product details with images and reviews
- Category-based organization
- Stock management

### Shopping Cart
- Add/remove/update items
- Real-time stock validation
- Persistent cart across sessions
- Price calculation with tax and shipping

### Checkout Process
- Address management
- Order summary
- Order placement
- Order history

### User Management
- User registration and login
- Profile management
- Multiple shipping addresses
- Order tracking

### Admin Features
- Product CRUD operations
- Category management
- Order status updates
- Customer management

## 🎨 UI Components

The frontend uses shadcn/ui for a consistent, accessible component library:
- Button, Input, Card, Badge
- Toast notifications
- Form components
- Layout components

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with BCrypt
- Role-based authorization
- CORS configuration
- Input validation
- SQL injection prevention

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px+)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🚀 Production Deployment

### Backend
1. Update `appsettings.Production.json` with production settings
2. Build the application:
```bash
dotnet publish -c Release
```

### Frontend
1. Build for production:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For questions or support, please open an issue in the repository.
