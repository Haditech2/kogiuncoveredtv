#!/bin/bash

# Build script for Vercel
echo "Installing dependencies..."

# Run database migrations
echo "Running database migrations..."
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "Build complete!"
