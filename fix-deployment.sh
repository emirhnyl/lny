#!/bin/bash

# Fix Deployment Script
# This script will ensure the server has the latest code and restart properly

echo "🔧 Fixing deployment..."

# Navigate to project directory
cd /root/lny-website

# Stop PM2 process
echo "⏸️  Stopping PM2 process..."
pm2 stop lny-website || true

# Remove node_modules and package-lock to ensure clean state
echo "🧹 Cleaning old dependencies..."
rm -rf node_modules package-lock.json

# Pull latest code from GitHub
echo "⬇️  Pulling latest code..."
git fetch origin main
git reset --hard origin/main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npm run db:generate

# Build the application
echo "🏗️  Building application..."
npm run build

# Start with PM2
echo "🚀 Starting application..."
pm2 start npm --name "lny-website" -- start

# Save PM2 configuration
echo "💾 Saving PM2 configuration..."
pm2 save

# Show status
echo "✅ Deployment fixed! Current status:"
pm2 status

echo ""
echo "📝 View logs with: pm2 logs lny-website"
