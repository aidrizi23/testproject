# Ecommerce Store Frontend

A modern, responsive e-commerce frontend built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **Modern UI**: Clean, professional design with shadcn/ui components
- **Responsive**: Optimized for all screen sizes
- **Authentication**: JWT-based auth with persistent sessions
- **State Management**: Zustand for efficient state handling
- **Product Browsing**: Advanced search, filters, and sorting
- **Shopping Cart**: Real-time cart management
- **Checkout**: Multi-step checkout process
- **User Dashboard**: Order history and profile management
- **Smooth Animations**: Framer Motion transitions

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- Axios
- Framer Motion
- Lucide React Icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── login/             # Authentication
│   └── dashboard/         # User dashboard
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── Header.tsx        # Header component
│   ├── Footer.tsx        # Footer component
│   └── ProductCard.tsx   # Product card
├── lib/                   # Utilities
│   ├── api.ts            # API client
│   ├── store.ts          # Zustand stores
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
└── hooks/                 # Custom hooks
```

## Pages

### Public Pages
- `/` - Home page with featured products
- `/products` - Product listing with filters
- `/products/[id]` - Product detail page
- `/login` - User login
- `/register` - User registration

### Protected Pages
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/dashboard` - User dashboard
- `/dashboard/orders` - Order history

## Components

### UI Components (shadcn/ui)
- Button
- Input
- Card
- Badge
- Label
- Toast
- Separator

### Custom Components
- Header - Navigation with cart count
- Footer - Site footer
- ProductCard - Product display card

## State Management

Using Zustand for:
- Authentication state
- Shopping cart state
- User preferences

## API Integration

The app connects to the .NET API backend:
- Axios for HTTP requests
- JWT token management
- Request/response interceptors

## Styling

- Tailwind CSS for utility-first styling
- CSS variables for theming
- Responsive breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
  - 2xl: 1536px

## Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL

## Features Implemented

### Product Features
- Product listing with pagination
- Search functionality
- Category filtering
- Price range filtering
- Sort by price, name, rating
- Product details with images
- Product reviews

### Shopping Features
- Add to cart
- Update quantities
- Remove items
- Cart persistence
- Real-time stock validation

### User Features
- User registration
- Login/logout
- Profile management
- Address management
- Order history
- Order tracking

### UX Features
- Toast notifications
- Loading states
- Error handling
- Responsive navigation
- Smooth page transitions

## Best Practices

- TypeScript for type safety
- Component composition
- Reusable UI components
- Responsive design
- Accessibility
- SEO optimization
- Error boundaries
- Loading states

## License

MIT
