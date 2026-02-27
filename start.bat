@echo off
title Heart Risk Tool v2.0

echo.
echo   Heart Risk Awareness Tool v2.0 - Setup ^& Launch
echo   ──────────────────────────────────────────────────
echo.

where node >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Node.js not found. Install from https://nodejs.org
  pause & exit /b 1
)
for /f "tokens=*" %%v in ('node -v') do set NV=%%v
echo [OK] Node.js %NV%

echo.
echo [1/2] Installing backend dependencies...
cd backend && call npm install --silent && cd ..
echo [OK] Backend ready

echo [2/2] Installing frontend dependencies...
cd frontend && call npm install --silent && cd ..
echo [OK] Frontend ready

echo.
echo Starting backend on port 4000...
start "Heart Risk - Backend" cmd /k "cd backend && npm start"
timeout /t 3 /nobreak >nul

echo Starting frontend on port 3000...
start "Heart Risk - Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak >nul

echo.
echo   ══════════════════════════════════════════
echo   App:     http://localhost:3000
echo   API:     http://localhost:4000
echo   Health:  http://localhost:4000/api/health
echo   ══════════════════════════════════════════
echo.
pause
