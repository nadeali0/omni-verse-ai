#!/bin/bash

# OMNI-VERSE AI Deployment Script
# Usage: ./scripts/deploy.sh

set -e

echo "🚀 OMNI-VERSE AI Deployment"
echo "============================="

# Check environment
if [ ! -f .env.local ]; then
  echo "❌ .env.local not found"
  exit 1
fi

echo "✓ Environment variables found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

# Run type check
echo "🔍 Type checking..."
npm run type-check

# Run linting
echo "🎯 Linting..."
npm run lint

# Build
echo "🔨 Building..."
npm run build

# Run migrations
echo "💾 Running database migrations..."
npm run db:push

echo "✅ Deployment ready!"
echo ""
echo "Start with: npm start"
