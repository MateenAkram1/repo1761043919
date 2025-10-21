# ToothDoctor - Quick Setup Guide

This guide will help you get ToothDoctor up and running in minutes.

## Prerequisites

- Node.js 20+ installed
- PostgreSQL 16+ installed (or use Docker)
- Git

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database

#### Option A: Using Docker (Recommended)
```bash
# Start PostgreSQL in Docker
docker-compose up -d postgres

# The database will be available at:
# postgresql://toothdoctor:toothdoctor123@localhost:5432/toothdoctor
```

#### Option B: Local PostgreSQL
```bash
# Create database
createdb toothdoctor

# Or using psql
psql -U postgres -c "CREATE DATABASE toothdoctor;"
```

### 3. Configure Environment
```bash
# Copy environment file
cp .env.example .env

# The default configuration should work with Docker
# If using local PostgreSQL, update DATABASE_URL in .env
```

### 4. Initialize Database
```bash
# Run migrations
npx prisma migrate dev

# Seed with sample data (creates admin, doctors, patients, services)
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
```

🎉 **Your app is now running at http://localhost:4002**

## Default Login Credentials

### Administrator
- **URL**: http://localhost:4002/auth/login
- **Email**: admin@toothdoctor.com
- **Password**: admin123
- **Access**: Full clinic management, view all appointments, manage services

### Doctor Accounts
- **Email**: sarah.johnson@toothdoctor.com (General Dentistry)
- **Email**: michael.chen@toothdoctor.com (Orthodontics)
- **Email**: emily.rodriguez@toothdoctor.com (Pediatric)
- **Email**: james.williams@toothdoctor.com (Oral Surgery)
- **Password**: doctor123 (for all)
- **Access**: View own appointments, manage schedule, add notes

### Patient Accounts
- **Email**: john.doe@example.com
- **Email**: jane.smith@example.com
- **Email**: bob.wilson@example.com
- **Password**: patient123 (for all)
- **Access**: Book appointments, view history, manage profile

## What's Included

### ✅ Public Pages
- Homepage with modern design
- About Us page
- Services catalog
- Doctor profiles
- Contact page

### ✅ Patient Features
- Register and login
- Book appointments online
- View appointment history
- Cancel/reschedule appointments
- Profile management

### ✅ Doctor Features
- View schedule and appointments
- Access patient information
- Add appointment notes
- Update availability
- Profile management

### ✅ Admin Features
- Dashboard with statistics
- Appointment management (approve/decline)
- Patient management
- Doctor management
- Service management
- Payment tracking
- Audit logs

## Testing the Application

### 1. As a Patient
1. Visit http://localhost:4002
2. Click "Sign Up" or "Book Appointment"
3. Register or login with patient credentials
4. Book an appointment with a doctor
5. View your appointments in the dashboard

### 2. As a Doctor
1. Login with doctor credentials
2. View your upcoming appointments
3. Confirm pending appointments
4. Add notes to appointments
5. Mark appointments as completed

### 3. As an Admin
1. Login with admin credentials
2. View all clinic statistics
3. Manage all appointments
4. Add or edit services
5. View audit logs

## Database Management

### View Database in GUI
```bash
npx prisma studio
```
Opens at http://localhost:5555

### Reset Database
```bash
npx prisma migrate reset
```
This will delete all data and re-seed

### Create New Migration
```bash
npx prisma migrate dev --name your_migration_name
```

## Troubleshooting

### Database Connection Error
- Check if PostgreSQL is running
- Verify DATABASE_URL in .env is correct
- If using Docker: `docker-compose ps` to check postgres status

### Port Already in Use
- Change port in package.json (--port 4002)
- Or stop the process using port 4002

### Prisma Errors
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset and resync
npx prisma migrate reset
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

### Payment Integration
1. Sign up for Stripe account
2. Add Stripe keys to .env:
   - STRIPE_SECRET_KEY
   - STRIPE_PUBLISHABLE_KEY
3. Test payment flow

### Email Notifications
1. Configure SMTP settings in .env:
   - SMTP_HOST
   - SMTP_PORT
   - SMTP_USER
   - SMTP_PASSWORD
2. Emails will be sent for appointment confirmations

### Production Deployment
1. Set up production database
2. Update environment variables
3. Build: `npm run build`
4. Start: `npm start`

## Useful Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm start                  # Start production server

# Database
npx prisma studio          # Open database GUI
npx prisma migrate dev     # Run migrations
npx prisma db seed         # Seed database
npx prisma generate        # Generate Prisma Client

# Testing
npm run test:e2e          # Run Playwright tests
npm test                  # Run unit tests

# Code Quality
npm run check-types       # TypeScript checks
npm run format           # Format code
```

## Support

If you encounter any issues:
1. Check the main README_TOOTHDOCTOR.md
2. Review error logs in terminal
3. Check browser console for frontend errors
4. Verify database connection with `npx prisma studio`

Happy coding! 🦷✨
