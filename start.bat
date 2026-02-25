@echo off
:: ═══════════════════════════════════════════════════════════════════
::  Heart Disease Risk Awareness Tool — Windows Setup & Run
:: ═══════════════════════════════════════════════════════════════════

title Heart Risk Tool

echo.
echo   Heart Risk Awareness Tool — Setup ^& Launch
echo   ------------------------------------------
echo.

:: ── Check Node ─────────────────────────────────────────────────────
where node >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Node.js is not installed.
  echo         Download it from https://nodejs.org
  pause
  exit /b 1
)

for /f "tokens=*" %%v in ('node -v') do set NODE_VER=%%v
echo [OK] Node.js %NODE_VER% detected

:: ── Install Backend ────────────────────────────────────────────────
echo.
echo [1/2] Installing backend dependencies...
cd backend
call npm install --silent
cd ..
echo [OK] Backend ready

:: ── Install Frontend ───────────────────────────────────────────────
echo [2/2] Installing frontend dependencies...
cd frontend
call npm install --silent
cd ..
echo [OK] Frontend ready

echo.
echo   All dependencies installed!
echo   ---------------------------------
echo.

:: ── Start Backend in new window ────────────────────────────────────
echo Starting backend on port 4000...
start "Heart Risk - Backend" cmd /k "cd backend && npm start"

:: ── Wait a moment then start Frontend ─────────────────────────────
timeout /t 2 /nobreak >nul

echo Starting frontend on port 3000...
start "Heart Risk - Frontend" cmd /k "cd frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo   ═════════════════════════════════════
echo   App is running!
echo.
echo   Frontend:   http://localhost:3000
echo   Backend:    http://localhost:4000
echo   API Health: http://localhost:4000/health
echo.
echo   Close the backend and frontend windows to stop.
echo   ═════════════════════════════════════
echo.
pause
