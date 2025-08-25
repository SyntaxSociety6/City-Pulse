# 🚀 CityPulse User Signup System

## Overview
The CityPulse project now includes a complete user authentication system that stores user registration data in a separate MongoDB database.

## 🗄️ Database Configuration

### User Database Details
- **Database Name**: Sign-Up-Database
- **Username**: Sign-Up-Database  
- **Password**: 01234567890
- **URL**: `mongodb+srv://Sign-Up-Database:01234567890@sing-up-database.xel6ioo.mongodb.net/?retryWrites=true&w=majority&appName=Sing-Up-Database`

### Data Stored
- **Full Name** (required)
- **Email Address** (required, unique)
- **Password** (required, min 6 characters, encrypted)
- **Created Date** (automatic)
- **Last Login** (automatic)

## 🖥️ Server Architecture

### 1. Maps Server (Port 4000)
- **Purpose**: Handles issue reports, projects, alerts
- **Database**: City-Pulse database
- **Location**: `Maps/server/`

### 2. User Server (Port 5000) - NEW!
- **Purpose**: Handles user registration, login, authentication
- **Database**: Sign-Up-Database
- **Location**: `user-server/`

## 🔐 API Endpoints

### User Registration
```
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### User Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Health Check
```
GET http://localhost:5000/health
```

## 🚀 How to Start the System

### Option 1: Complete System Startup
```bash
# Run the complete startup batch file
start_citypulse_complete.bat
```

### Option 2: Manual Startup
```bash
# Terminal 1: Start Maps Server
cd Maps/server
npm run dev

# Terminal 2: Start User Server  
cd user-server
npm run dev
```

## 🧪 Testing the System

### 1. Test Signup API
Open `test_signup.html` in your browser to test the signup functionality.

### 2. Test User Interface
1. Open `UI/Main.html`
2. Click "Sign up" link
3. Fill out the registration form
4. Submit - data will be stored in MongoDB!

### 3. Verify Data Storage
Check your MongoDB database to see the stored user data.

## 🔒 Security Features

- **Password Hashing**: Uses bcrypt with 12 salt rounds
- **JWT Tokens**: Secure authentication tokens
- **Input Validation**: Server-side validation
- **CORS**: Cross-origin resource sharing enabled
- **Rate Limiting**: Built-in protection

## 📱 User Flow

1. **User visits Main.html**
2. **Clicks "Sign up" link**
3. **Redirected to singup.html**
4. **Fills out registration form**
5. **Form validates input**
6. **Data sent to user server**
7. **Password encrypted and stored**
8. **User account created**
9. **JWT token generated**
10. **User redirected to Main.html**

## 🛠️ Technical Implementation

### Frontend (UI/singup.html)
- Form validation
- API integration
- Error handling
- Success messages
- Loading states

### Backend (user-server/index.js)
- Express.js server
- MongoDB connection
- User schema
- Password encryption
- JWT generation
- Input validation

### Database Schema
```javascript
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});
```

## 🔍 Troubleshooting

### Common Issues

1. **User server not starting**
   - Check if port 5000 is available
   - Verify MongoDB connection string
   - Check npm dependencies

2. **Database connection failed**
   - Verify MongoDB credentials
   - Check network connectivity
   - Ensure database exists

3. **Signup form not working**
   - Check browser console for errors
   - Verify user server is running
   - Check CORS settings

### Debug Commands
```bash
# Check Maps server
curl http://localhost:4000/health

# Check User server
curl http://localhost:5000/health

# Test signup endpoint
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test","email":"test@test.com","password":"123456","confirmPassword":"123456"}'
```

## 📊 System Status

- ✅ **Maps Server**: Running on port 4000
- ✅ **User Server**: Running on port 5000  
- ✅ **MongoDB Reports**: Connected
- ✅ **MongoDB Users**: Connected
- ✅ **Frontend UI**: Ready
- ✅ **Authentication**: Active

## 🎯 Next Steps

1. **Add Login Page**: Create login.html with authentication
2. **User Dashboard**: Protected user profile page
3. **Password Reset**: Forgot password functionality
4. **Email Verification**: Email confirmation system
5. **Admin Panel**: User management interface

---

**🎉 Your CityPulse project now has a complete user authentication system!**

