#!/bin/bash
set -e

APP_DIR="/home/ubuntu/apps/graphic-design-tool-main"

cd "$APP_DIR"

echo "Current files:"
ls -la

if [ -d "Backend" ]; then
  cd Backend
  npm install
  pm2 delete backend || true
  pm2 start server.js --name backend
  cd ..
fi

if [ -d "Frontend" ]; then
  cd Frontend
  npm install
  npm run build || true
  cd ..
fi

pm2 save || true

echo "Deployment finished"
