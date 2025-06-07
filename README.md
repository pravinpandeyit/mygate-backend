# MyGate Backend

A robust backend system for society/apartment management built with Node.js, Express, and MySQL. This system helps manage residential societies, users, visitors, and various society-related operations efficiently.

## Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Sequelize
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt
- **Input Validation:** Joi
- **Rate Limiting:** express-rate-limit
- **Caching:** Redis (via ioredis)
- **Environment Variables:** dotenv

## Project Structure

```
mygate-backend/
├── src/
│   ├── config/         # Configuration files (database, env, etc.)
│   ├── core/           # Core functionalities and middlewares
│   ├── models/         # Database models
│   ├── modules/        # Business logic modules
│   ├── routes/         # API route definitions
│   └── server.js       # Main application entry point
├── package.json        # Project dependencies and scripts
├── .env.example        # Example environment variables
├── mygate-api-collection.json  # Postman API collection
└── README.md          # Project documentation
```

## Features

### Society Management
- Society creation and management
- Building and flat management
- Facility management

### User Management
- User registration and authentication
- Role-based access control (Super Admin, Admin, Residents, Security)
- Profile management
- User verification and approval system

### Visitor Management
- Visitor entry and exit logging
- Pre-approved visitor management
- Digital gate pass generation
- Delivery management
- Staff/Helper management

## Local Setup

1. **Prerequisites**
   - Node.js (v14 or higher)
   - MySQL (v8.0 or higher)
   - Redis Server

2. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd mygate-backend
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Environment Setup**
   - Copy `.env.example` to create your own `.env` file:
     ```bash
     cp .env.example .env
     ```
   - Update the values in `.env` with your configurations:
     ```env
     # Server Configuration
     PORT=3000
     NODE_ENV=development

     # Database Configuration
     DB_HOST=localhost
     DB_USER=your_username
     DB_PASS=your_password
     DB_NAME=mygate_db

     # Authentication
     JWT_SECRET=your_jwt_secret
     JWT_EXPIRES_IN=24h

     # Redis Configuration
     REDIS_URL=redis://localhost:6379

     # Rate Limiting
     RATE_LIMIT_WINDOW=15
     RATE_LIMIT_MAX_REQUESTS=100
     ```

5. **Database Setup**
   - Create a MySQL database named `mygate_db`
   - The application will automatically create the required tables on first run

6. **Start the Server**
   ```bash
   npm start
   ```
   The server will start on http://localhost:3000

## API Documentation

The API endpoints are organized under `/api` with the following main categories:
- `/api/auth` - Authentication endpoints
- `/api/societies` - Society management
- `/api/users` - User management
- `/api/visitors` - Visitor management


Please find the latest Postman collection file `mygate-api-collection.json` in the root directory of the project. You can import this collection into Postman to test all available API endpoints.
