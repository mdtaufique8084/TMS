# Task Management System (TMS)

A full-stack web application for managing personal tasks with user authentication. Built with React, TypeScript, Node.js, Express, Prisma, and MySQL.

## 🚀 Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **Real-time UI**: Modern React interface with Redux state management
- **Protected Routes**: Secure task access with authentication middleware
- **Responsive Design**: Built with Tailwind CSS for mobile-first design
- **Type Safety**: Full TypeScript implementation across frontend and backend

## 🏗️ Architecture

### Backend
- **Node.js** with **Express.js** framework
- **Prisma ORM** for database operations
- **MySQL** database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

### Frontend
- **React 19** with **TypeScript**
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **React Hook Form** with **Zod** validation
- **React Hot Toast** for notifications

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v8 or higher)
- **MySQL** (v8 or higher)
- **Git**

## 🛠️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TMS
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### 3. Configure Environment Variables

Create a `.env` file in the `Backend` directory with the following variables:

```env
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/task_manager_db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-here"

# Server Configuration
PORT=5000
```

**Important**: Replace the database credentials and JWT secret with your actual values.

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd ../Frontend

# Install dependencies
npm install
```

## 🚀 How to Run the Application

### Development Mode

1. **Start the Backend Server**:
   ```bash
   cd Backend
   npm install
   npm run dev
   ```
   The backend will start on `http://localhost:5000`

2. **Start the Frontend Development Server**:
   ```bash
   cd Frontend
   npm install
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

3. **Access the Application**:
   - Open your browser and navigate to `http://localhost:5173`
   - The application will automatically connect to the backend API

### Production Mode

1. **Build the Frontend**:
   ```bash
   cd Frontend
   npm run build
   ```

2. **Build the Backend**:
   ```bash
   cd Backend
   npm run build
   ```

3. **Start the Backend**:
   ```bash
   cd Backend
   npm start
   ```

## 🧪 Testing

### Running Tests

Currently, the project doesn't have test suites configured. To add testing:

**Backend Testing** (Jest + Supertest):
```bash
cd Backend
npm install --save-dev jest supertest @types/jest @types/supertest
npm test
```

**Frontend Testing** (Vitest + React Testing Library):
```bash
cd Frontend
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
npm test
```

### Test Coverage

To view test coverage reports:

```bash
# Backend coverage
cd Backend
npm run test:coverage

# Frontend coverage
cd Frontend
npm run test:coverage
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "username": "john_doe"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Task Endpoints

All task endpoints require authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive README and API docs",
    "status": "pending",
    "userId": 1,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "description": "string (optional)",
  "status": "pending" | "completed"
}
```

**Response:**
```json
{
  "id": 2,
  "title": "New task",
  "description": "Task description",
  "status": "pending",
  "userId": 1,
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "string",
  "description": "string (optional)",
  "status": "pending" | "completed"
}
```

**Response:**
```json
{
  "id": 2,
  "title": "Updated task",
  "description": "Updated description",
  "status": "completed",
  "userId": 1,
  "createdAt": "2024-01-15T11:00:00.000Z",
  "updatedAt": "2024-01-15T12:00:00.000Z"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Task deleted"
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## 🗄️ Database Schema

### User Table
```sql
CREATE TABLE User (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
```

### Task Table
```sql
CREATE TABLE Task (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  status      VARCHAR(50) DEFAULT 'pending',
  userId      INT NOT NULL,
  createdAt   DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt   DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
);
```

## 🔧 Development Scripts

### Backend Scripts
```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm start        # Start production server
npm run test     # Run tests (when configured)
```

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run test     # Run tests (when configured)
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify MySQL is running
   - Check DATABASE_URL in .env file
   - Ensure database exists

2. **Port Already in Use**:
   - Change PORT in backend .env file
   - Kill existing processes using the port

3. **CORS Issues**:
   - Ensure backend CORS is configured for frontend URL
   - Check if both servers are running on correct ports

4. **Authentication Issues**:
   - Verify JWT_SECRET is set in .env
   - Check token expiration (1 hour default)

### Database Reset

```bash
cd Backend
npx prisma migrate reset
npx prisma migrate dev
```

## 📁 Project Structure

```
TMS/
├── Backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controller/      # Route controllers
│   │   ├── middleware/      # Authentication middleware
│   │   ├── routes/          # API routes
│   │   └── index.ts         # Server entry point
│   ├── prisma/
│   │   ├── migrations/      # Database migrations
│   │   └── schema.prisma    # Database schema
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── api/             # API configuration
│   │   ├── app/             # Redux store configuration
│   │   ├── components/      # Reusable components
│   │   ├── features/        # Feature-based modules
│   │   │   ├── auth/        # Authentication features
│   │   │   └── tasks/       # Task management features
│   │   ├── routes/          # Application routing
│   │   └── types/           # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the package.json files for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the API documentation
3. Open an issue in the repository
4. Contact the development team

---

**Happy Task Managing! 🎯**
