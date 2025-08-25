# 🔧 Troubleshooting Signup Page Issues

## ✅ **Current Status (Fixed!)**
- **Maps Server**: ✅ Running on port 4000
- **User Server**: ✅ Running on port 5000
- **Signup Page**: ✅ Working
- **Database**: ✅ Connected

## 🚨 **Common Issues & Solutions**

### 1. **Signup Page Not Opening**
**Problem**: Page shows blank or doesn't load
**Solution**: 
- Make sure both servers are running
- Check browser console for errors
- Verify file path: `UI\singup.html`

### 2. **User Server Not Running**
**Problem**: Port 5000 connection failed
**Solution**:
```bash
cd user-server
npm run dev
```

### 3. **Database Connection Failed**
**Problem**: MongoDB connection error
**Solution**:
- Check internet connection
- Verify database credentials
- Ensure database exists

### 4. **Form Submission Fails**
**Problem**: Can't submit signup form
**Solution**:
- Check if user server is running on port 5000
- Verify browser console for errors
- Check network tab for failed requests

## 🧪 **Testing Steps**

### Step 1: Check Servers
```bash
# Check Maps Server
curl http://localhost:4000/health

# Check User Server
curl http://localhost:5000/health
```

### Step 2: Test Signup Page
1. Open `UI\singup.html` in browser
2. Fill out the form
3. Click "Sign Up"
4. Check for success message

### Step 3: Verify Database
- Check MongoDB for new user
- Verify data is stored correctly

## 🚀 **Quick Fix Commands**

### Start Both Servers
```bash
# Terminal 1: Maps Server
cd Maps\server
npm run dev

# Terminal 2: User Server
cd user-server
npm run dev
```

### Or Use Batch File
```bash
start_citypulse_complete.bat
```

## 📱 **How to Access Signup**

### Method 1: Direct Access
- Navigate to: `UI\singup.html`
- File should open in default browser

### Method 2: Through Main Page
1. Open `UI\Main.html`
2. Click "Sign up" link
3. Should redirect to signup page

### Method 3: Test API
- Open `test_signup.html` in browser
- Test the signup functionality directly

## 🔍 **Debug Information**

### Server URLs
- **Maps Server**: http://localhost:4000
- **User Server**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### File Locations
- **Main Page**: `UI\Main.html`
- **Signup Page**: `UI\singup.html`
- **Test Page**: `test_signup.html`

### Database Details
- **Reports DB**: City-Pulse (port 4000)
- **Users DB**: Sign-Up-Database (port 5000)

## ✅ **Verification Checklist**

- [ ] Maps server running on port 4000
- [ ] User server running on port 5000
- [ ] Both servers show "✅ Connected"
- [ ] Signup page opens without errors
- [ ] Form validation works
- [ ] Form submission succeeds
- [ ] Success message appears
- [ ] User data stored in database

## 🆘 **Still Having Issues?**

1. **Check Browser Console** (F12)
2. **Verify Network Tab** for failed requests
3. **Check Server Logs** in terminal
4. **Restart Both Servers**
5. **Clear Browser Cache**

---

**🎯 The signup page should now be working! Both servers are running and connected.**
