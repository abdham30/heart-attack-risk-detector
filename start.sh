#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
#  Heart Disease Risk Awareness Tool — Setup & Run Script
#  Installs all dependencies and starts both frontend + backend.
# ═══════════════════════════════════════════════════════════════════

set -e  # Exit immediately on error

# ── Colors ─────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
RESET='\033[0m'

BACKEND_PORT=4000
FRONTEND_PORT=3000

# ── Banner ──────────────────────────────────────────────────────────
echo ""
echo -e "${RED}${BOLD}  🫀  Heart Risk Awareness Tool${RESET}"
echo -e "${CYAN}  Setup & Launch Script${RESET}"
echo "  ─────────────────────────────────────"
echo ""

# ── Check Node.js ──────────────────────────────────────────────────
if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ Node.js is not installed.${RESET}"
  echo "  → Download it from https://nodejs.org (v18+ recommended)"
  exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} detected${RESET}"

# ── Check npm ──────────────────────────────────────────────────────
if ! command -v npm &> /dev/null; then
  echo -e "${RED}✗ npm is not installed. Please reinstall Node.js.${RESET}"
  exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ npm ${NPM_VERSION} detected${RESET}"
echo ""

# ── Install Backend Dependencies ───────────────────────────────────
echo -e "${YELLOW}[1/2] Installing backend dependencies...${RESET}"
cd backend
npm install --silent
echo -e "${GREEN}✓ Backend ready${RESET}"
cd ..

# ── Install Frontend Dependencies ──────────────────────────────────
echo -e "${YELLOW}[2/2] Installing frontend dependencies...${RESET}"
cd frontend
npm install --silent
echo -e "${GREEN}✓ Frontend ready${RESET}"
cd ..

echo ""
echo -e "${BOLD}  All dependencies installed!${RESET}"
echo "  ─────────────────────────────────────"
echo ""

# ── Kill any existing processes on the ports ───────────────────────
echo -e "${CYAN}  Checking for port conflicts...${RESET}"

kill_port() {
  local PORT=$1
  local PID
  PID=$(lsof -ti tcp:"$PORT" 2>/dev/null || true)
  if [ -n "$PID" ]; then
    echo -e "  ${YELLOW}⚠ Port $PORT in use (PID $PID) — freeing it${RESET}"
    kill -9 "$PID" 2>/dev/null || true
    sleep 0.5
  fi
}

kill_port $BACKEND_PORT
kill_port $FRONTEND_PORT

# ── Start Backend ──────────────────────────────────────────────────
echo ""
echo -e "${CYAN}  Starting backend on port ${BACKEND_PORT}...${RESET}"
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Wait for backend to be ready
echo -n "  Waiting for API"
for i in {1..20}; do
  sleep 0.5
  if curl -s "http://localhost:${BACKEND_PORT}/health" > /dev/null 2>&1; then
    echo ""
    echo -e "${GREEN}  ✓ API is up at http://localhost:${BACKEND_PORT}${RESET}"
    break
  fi
  echo -n "."
done

# ── Start Frontend ─────────────────────────────────────────────────
echo ""
echo -e "${CYAN}  Starting frontend on port ${FRONTEND_PORT}...${RESET}"
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

sleep 2

# ── Done ───────────────────────────────────────────────────────────
echo ""
echo "  ═════════════════════════════════════"
echo -e "  ${GREEN}${BOLD}🚀 App is running!${RESET}"
echo ""
echo -e "  ${BOLD}Frontend:${RESET}  http://localhost:${FRONTEND_PORT}"
echo -e "  ${BOLD}Backend:${RESET}   http://localhost:${BACKEND_PORT}"
echo -e "  ${BOLD}API Health:${RESET} http://localhost:${BACKEND_PORT}/health"
echo ""
echo -e "  ${YELLOW}Press Ctrl+C to stop both servers${RESET}"
echo "  ═════════════════════════════════════"
echo ""

# ── Trap Ctrl+C to kill both processes cleanly ─────────────────────
cleanup() {
  echo ""
  echo -e "${YELLOW}  Shutting down...${RESET}"
  kill "$BACKEND_PID" 2>/dev/null || true
  kill "$FRONTEND_PID" 2>/dev/null || true
  echo -e "${GREEN}  ✓ Stopped. Goodbye!${RESET}"
  exit 0
}

trap cleanup SIGINT SIGTERM

# ── Keep script alive ──────────────────────────────────────────────
wait
