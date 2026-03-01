#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
#  Heart Risk Awareness Tool v2.0 — Setup & Launch
#  Installs all dependencies and starts both servers.
# ═══════════════════════════════════════════════════════════════════

set -e

# Colors
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

echo ""
echo -e "${CYAN}${BOLD}  🫀  Heart Risk Awareness Tool v2.0${RESET}"
echo -e "${CYAN}  Setup & Launch${RESET}"
echo "  ─────────────────────────────────────"
echo ""

# ── Check Node.js ──────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  echo -e "${RED}✗ Node.js not found. Install from https://nodejs.org (v18+)${RESET}"; exit 1
fi
echo -e "${GREEN}✓ Node.js $(node -v)${RESET}"

# ── Install Backend ────────────────────────────────────────────
echo -e "\n${YELLOW}[1/2] Installing backend dependencies...${RESET}"
cd backend && npm install --silent && cd ..
echo -e "${GREEN}✓ Backend ready${RESET}"

# ── Install Frontend ───────────────────────────────────────────
echo -e "${YELLOW}[2/2] Installing frontend dependencies...${RESET}"
cd frontend && npm install --silent && cd ..
echo -e "${GREEN}✓ Frontend ready${RESET}"

# ── Free ports ─────────────────────────────────────────────────
for PORT in 4000 3000; do
  PID=$(lsof -ti tcp:$PORT 2>/dev/null || true)
  if [ -n "$PID" ]; then
    echo -e "${YELLOW}  ⚠ Freeing port $PORT (PID $PID)${RESET}"
    kill -9 "$PID" 2>/dev/null || true; sleep 0.3
  fi
done

# ── Start Backend ──────────────────────────────────────────────
echo -e "\n${CYAN}  Starting backend (port 4000)...${RESET}"
cd backend && npm start &
BACKEND_PID=$!
cd ..

# Wait for API health
echo -n "  Waiting for API"
for i in {1..24}; do
  sleep 0.5
  if curl -s http://localhost:4000/api/health >/dev/null 2>&1; then
    echo ""; echo -e "${GREEN}  ✓ API ready at http://localhost:4000${RESET}"; break
  fi
  echo -n "."
done

# ── Start Frontend ─────────────────────────────────────────────
echo -e "\n${CYAN}  Starting frontend (port 3000)...${RESET}"
cd frontend && npm run dev &
FRONTEND_PID=$!
cd ..

sleep 2

echo ""
echo "  ═══════════════════════════════════════════"
echo -e "  ${GREEN}${BOLD}🚀 Application Running!${RESET}"
echo ""
echo -e "  ${BOLD}App:${RESET}        http://localhost:3000"
echo -e "  ${BOLD}API:${RESET}        http://localhost:4000"
echo -e "  ${BOLD}Health:${RESET}     http://localhost:4000/api/health"
echo ""
echo -e "  ${YELLOW}Press Ctrl+C to stop both servers${RESET}"
echo "  ═══════════════════════════════════════════"
echo ""

cleanup() {
  echo -e "\n${YELLOW}  Shutting down...${RESET}"
  kill "$BACKEND_PID" 2>/dev/null || true
  kill "$FRONTEND_PID" 2>/dev/null || true
  echo -e "${GREEN}  ✓ Stopped.${RESET}"
  exit 0
}
trap cleanup SIGINT SIGTERM
wait
