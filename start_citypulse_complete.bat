@echo off
echo ========================================
echo 🚀 CityPulse - Complete System Startup
echo ========================================
echo.

echo Starting Complete CityPulse System...
echo.

echo 1. Starting Maps server (Reports & Issues)...
cd backend\maps\server
start "CityPulse Maps Server" cmd /k "npm run dev"
echo Waiting for Maps server to start...
timeout /t 5 /nobreak >nul
cd ..\..

echo.
echo 2. Starting User Authentication server...
cd user-server
start "CityPulse User Server" cmd /k "npm run dev"
echo Waiting for User server to start...
timeout /t 5 /nobreak >nul
cd ..

echo.
echo 3. Checking server status...
echo.
echo 🔍 Checking Maps server...
curl -s http://localhost:4000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Maps server is running on port 4000
) else (
    echo ❌ Maps server failed to start
)

echo 🔍 Checking User server...
curl -s http://localhost:5000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ User server is running on port 5000
) else (
    echo ❌ User server failed to start
)

echo.
echo 4. Opening CityPulse Application...
echo.
echo 🏠 Opening Homepage...
start "" "frontend\Main.html"
timeout /t 1 /nobreak >nul

echo 📊 Opening Dashboard...
start "" "frontend\index.html"
timeout /t 1 /nobreak >nul

echo 🗺️ Opening Interactive Map...
start "" "frontend\1.html"
timeout /t 1 /nobreak >nul

echo.
echo ========================================
echo 🎉 CityPulse Complete System Started!
echo ========================================
echo.
echo 🌐 Server URLs:
echo    • Maps Server: http://localhost:4000
echo    • User Server: http://localhost:5000
echo.
echo 📱 Application Pages:
echo    • Homepage: frontend\Main.html
echo    • Dashboard: frontend\index.html  
echo    • Interactive Map: frontend\1.html
echo    • Sign Up: frontend\singup.html
echo.
echo 🔐 New Features:
echo    • User Registration & Login
echo    • Secure Password Storage
echo    • JWT Authentication
echo    • MongoDB User Database
echo.
echo 📋 How to Test:
echo    1. Click "Sign Up" on Main page
echo    2. Fill out the registration form
echo    3. Submit - data stored in MongoDB!
echo    4. Check alter.html for real reports
echo.
echo Press any key to exit...
pause >nul

