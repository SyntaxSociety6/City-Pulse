@echo off
echo ========================================
echo 🚀 CityPulse - Urban Development Tracker
echo ========================================
echo.

echo Starting CityPulse System...
echo.

echo 1. Checking Maps server status...
curl -s http://localhost:4000/health >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Maps server is already running on port 4000
) else (
    echo 🔄 Starting Maps server...
    cd Maps\server
    start "CityPulse Maps Server" cmd /k "npm run dev"
    echo Waiting for server to start...
    timeout /t 5 /nobreak >nul
    cd ..\..
)

echo.
echo 2. Opening CityPulse Application...
echo.
echo 🏠 Opening Homepage...
start "" "UI\Main.html"
timeout /t 1 /nobreak >nul

echo 📊 Opening Dashboard...
start "" "UI\index.html"
timeout /t 1 /nobreak >nul

echo 🗺️ Opening Interactive Map...
start "" "UI\1.html"
timeout /t 1 /nobreak >nul

echo.
echo ========================================
echo 🎉 CityPulse Started Successfully!
echo ========================================
echo.
echo 🌐 Application URLs:
echo    • Homepage: UI\Main.html
echo    • Dashboard: UI\index.html  
echo    • Interactive Map: UI\1.html
echo    • Maps Server: http://localhost:4000
echo.
echo 📱 How to Use:
echo    1. Navigate to the Interactive Map
echo    2. Click anywhere on the map to select location
echo    3. Fill out the issue report form
echo    4. Submit - automatically stored in MongoDB!
echo.
echo 🔄 Real-time Features:
echo    • Live statistics updates
echo    • Instant issue reporting
echo    • Real-time map markers
echo    • Server-Sent Events for live data
echo.
echo Press any key to exit...
pause >nul
