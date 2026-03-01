#!/bin/bash

# Build script for Vercel
echo "Installing dependencies..."

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

echo "Build complete!"
