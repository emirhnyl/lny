#!/bin/bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Navigate to project
cd /root/lny-website

echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "🔄 Generating Prisma Client..."
npm run db:generate

echo "💾 Pushing database schema..."
npm run db:push

echo "📁 Creating upload directories..."
mkdir -p public/models/uploads
mkdir -p public/images/uploads

echo "🏗️  Building application..."
npm run build

echo "🔄 Restarting PM2..."
pm2 restart lny-website || pm2 start npm --name "lny-website" -- start

echo "✅ Deployment completed!"
pm2 status lny-website
