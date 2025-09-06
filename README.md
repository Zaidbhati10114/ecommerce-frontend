# E-commerce Frontend

A modern, responsive React.js frontend for an e-commerce application with user authentication, product browsing, and shopping cart functionality.

## 🚀 Features

- **Modern React Architecture**: Built with React 18+ and functional components
- **User Authentication**: Login and registration with JWT token management
- **Protected Routes**: Route protection for authenticated users
- **Shopping Cart**: Add, update, and manage cart items
- **Product Browsing**: Browse and search products with filters
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Context API**: State management using React Context for auth and cart
- **React Router**: Client-side routing with React Router v6

## 🛠️ Technology Stack

- **React.js** - Frontend framework
- **React Router v6** - Client-side routing
- **Context API** - State management
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **JavaScript ES6+** - Modern JavaScript features

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce-frontend.git
   cd ecommerce-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   REACT_APP_API_BASE_URL=http://localhost:8000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The application will open in your browser at `http://localhost:3000`

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `REACT_APP_API_URL` | Backend API base URL | Yes |
| `REACT_APP_API_BASE_URL` | Backend API endpoints base URL | Yes |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.js       # Navigation component
│   ├── ProductCard.js  # Product display component
│   └── ...
├── context/            # React Context providers
│   ├── AuthContext.js  # Authentication state management
│   └── CartContext.js  # Shopping cart state management
├── pages/              # Page components
│   ├── Home.js         # Home/Products page
│   ├── Login.js        # Login page
│   ├── Register.js     # Registration page
│   └── Cart.js         # Shopping cart page
├── services/           # API service functions
│   └── api.js          # HTTP client configuration
├── utils/              # Utility functions
├── App.js              # Main application component
├── index.js            # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## 🛣️ Routes

| Route | Component | Protection | Description |
|-------|-----------|------------|-------------|
| `/` | Home (redirect) | Protected | Redirects to home page |
| `/home` | Home | Protected | Main products listing page |
| `/login` | Login | Public | User login page |
| `/register` | Register | Public | User registration page |
| `/cart` | Cart | Protected | Shopping cart page |

## 🔐 Authentication Flow

1. **Login/Register**: User authenticates via login or registration forms
2. **Token Storage**: JWT token stored in localStorage/sessionStorage
3. **Context State**: Authentication state managed via AuthContext
4. **Protected Routes**: ProtectedRoute component checks authentication
5. **Auto Redirect**: Unauthenticated users redirected to login

## 🛒 State Management

### AuthContext
- User authentication state
- Login/logout functionality
- Token management
- User profile data

### CartContext
- Shopping cart items
- Add/remove/update cart items
- Cart total calculations
- Persist cart state

## 🎨 Styling

The application uses **Tailwind CSS** for styling:
- Utility-first CSS framework
- Responsive design classes
- Custom color schemes
- Component-based styling

Key design features:
- Clean, modern interface
- Mobile-responsive layout
- Consistent color palette
- Smooth transitions and hover effects

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop** - Full layout with sidebar navigation
- **Tablet** - Adapted layout with collapsible elements
- **Mobile** - Touch-friendly interface with mobile navigation

## 🔌 API Integration

The frontend communicates with the backend API for:
- User authentication (login/register)
- Product data fetching
- Shopping cart operations
- User profile management

### API Service Structure
```javascript
// Example API service usage
import { authAPI, productsAPI, cartAPI } from './services/api';

// Authentication
await authAPI.login(credentials);
await authAPI.register(userData);

// Products
await productsAPI.getAll();
await productsAPI.search(query);

// Cart
await cartAPI.add(itemId, quantity);
await cartAPI.update(itemId, quantity);
```

## 🚦 Error Handling

- **API Errors**: Centralized error handling for API requests
- **Form Validation**: Client-side form validation with error messages
- **Network Errors**: Graceful handling of network connectivity issues
- **404 Pages**: Custom error pages for invalid routes

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🏗️ Build & Deployment

### Development Build
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify**: Connect GitHub repo for automatic deployments
- **Vercel**: Deploy with zero configuration
- **GitHub Pages**: Static site hosting
- **AWS S3**: Host as static website

### Build Optimization
- Code splitting for better performance
- Bundle size optimization
- Asset optimization (images, fonts)
- PWA capabilities (if configured)

## 📋 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Create production build |
| `npm test` | Run test suite |
| `npm run eject` | Eject from Create React App |

## 🔧 Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API server running

### Development Workflow
1. Start the backend server
2. Update environment variables
3. Run `npm start` to start development server
4. Make changes and see live updates
5. Run tests to ensure functionality

### Code Style
- ES6+ JavaScript features
- Functional components with hooks
- Consistent naming conventions
- ESLint configuration for code quality

## 🔄 State Flow

```
App Component
├── AuthProvider (Authentication State)
├── CartProvider (Cart State)
├── Router (Navigation)
├── Navbar (Always Visible)
└── Routes
    ├── Public Routes (Login, Register)
    └── Protected Routes (Home, Cart)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🔗 Related Projects

- [E-commerce Backend](https://github.com/Zaidbhati10114/ecommerce-backend) - API server for this frontend

