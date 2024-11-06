#!/bin/bash

# deployment.sh
# Make this script executable with: chmod +x deployment.sh

echo "Starting deployment..."

# Pull latest changes from git (if using git)
git pull origin main

# Install dependencies
npm install

# Build the application
npm run build

# Copy build files to nginx directory
sudo cp -r build/* /var/www/auth-form/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/auth-form

# Restart nginx
sudo systemctl restart nginx

echo "Deployment completed!"