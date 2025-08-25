@echo off
echo Starting CityPulse Project...
echo.

echo 1. Installing dependencies for Maps server...
cd Maps\server
call npm install
echo.

echo 2. Starting Maps server on port 4000...
start "Maps Server" cmd /k "npm run dev"
echo.

echo 3. Waiting for server to start...
timeout /t 3 /nobreak >nul
echo.

echo 4. Opening main page in browser...
start "" "public\Main.html"
echo.

echo 5. Opening dashboard in browser...
start "" "public\index.html"
echo.

echo CityPulse Project started successfully!
echo.
echo - Maps Server: http://localhost:4000
echo - Main Page: public\Main.html
echo - Dashboard: public\index.html
echo - Interactive Map: public\1.html
echo.
echo Press any key to exit...
pause >nul
