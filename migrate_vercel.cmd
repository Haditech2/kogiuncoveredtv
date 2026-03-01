@echo off
REM Script to run migrations on Vercel Postgres database
REM 
REM INSTRUCTIONS:
REM 1. Get POSTGRES_URL from Vercel dashboard
REM 2. Set it as environment variable below
REM 3. Run this script

echo Setting up Vercel database connection...
set POSTGRES_URL=postgresql://neondb_owner:npg_LW7PGxMprqZ0@ep-misty-mouse-air5052r-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require

echo Running migrations...
python manage.py migrate

echo Creating superuser (if needed)...
python create_admin.py

echo Done! Your Vercel database is now ready.
pause
