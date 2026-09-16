#!/usr/bin/env bash
set -e
npm install
npm run install:all
echo "Installed. Copy server/.env from .env.example and run: npm run dev"
