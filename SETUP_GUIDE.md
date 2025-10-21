# ToothDoctor Setup Guide

## Quick Start

The ToothDoctor application is a complete Next.js-based dental clinic management system. Follow these steps to get started:

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy the example environment file:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration. Key variables:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `STRIPE_SECRET_KEY` - Your Stripe API key (optional for development)
- `SVIX_API_KEY` - Your Svix API key (optional)
- `RETRACED_API_KEY` - Your Retraced API key (optional)

### 3. Set Up the Database

```bash
# Run migrations
npx prisma migrate dev

# Seed the database with sample data
npx prisma db seed
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:4002`

## Docker Setup (Alternative)

To run the entire application with Docker:

```bash
# Start all services
docker-compose up -d

# Run database migrations
docker-compose exec app npx prisma migrate dev

# Seed the database
docker-compose exec app npx prisma db seed
```

## Default Login Credentials

After seeding the database, you can log in with these accounts:

### Admin Access
- **Email:** `admin@toothdoctor.com`
- **Password:** `admin123`
- **Access:** Full clinic management, appointment oversight, service/doctor management

### Doctor Accounts
- **Email:** `sarah.johnson@toothdoctor.com` (or michael.chen, emily.rodriguez, james.williams)
- **Password:** `doctor123`
- **Access:** View schedule, manage appointments, add doctor notes

### Patient Accounts
- **Email:** `john.doe@example.com` (or jane.smith, bob.wilson)
- **Password:** `patient123`
- **Access:** Book appointments, view appointment history, make payments

## Features

### For Patients
- ✅ Online appointment booking 24/7
- ✅ View upcoming and past appointments
- ✅ Cancel or reschedule appointments
- ✅ Browse services with pricing
- ✅ Secure online payments (Stripe integration)

### For Doctors
- ✅ Personal dashboard with schedule
- ✅ View patient information
- ✅ Add private appointment notes
- ✅ Manage profile and availability
- ✅ Confirm/complete appointments

### For Administrators
- ✅ Complete clinic management dashboard
- ✅ Appointment management (approve, cancel, reschedule)
- ✅ Patient records management
- ✅ Doctor profile and schedule management
- ✅ Service catalog with pricing
- ✅ Payment tracking and reporting
- ✅ Audit logs for critical actions

## Tech Stack

- **Framework:** Next.js 15 with TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS + DaisyUI
- **Payments:** Stripe
- **Webhooks:** Svix
- **Audit Logs:** Retraced
- **SSO:** SAML Jackson
- **Testing:** Playwright
- **Containerization:** Docker

## Available Scripts

```bash
# Development
npm run dev              # Start dev server on port 4002

# Production
npm run build            # Build for production
npm start                # Start production server

# Database
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Run migrations
npx prisma db seed       # Seed database

# Testing
npm run test:e2e         # Run Playwright E2E tests
npm run test             # Run unit tests

# Code Quality
npm run check-types      # TypeScript type checking
npm run check-lint       # ESLint
npm run format           # Format code with Prettier
```

## Project Structure

```
/workspace
├── pages/                    # Next.js pages
│   ├── api/                 # API routes
│   │   ├── appointments/    # Appointment CRUD
│   │   ├── doctors/         # Doctor endpoints
│   │   └── services/        # Service endpoints
│   ├── admin/              # Admin dashboard
│   ├── doctor/             # Doctor dashboard
│   ├── patient/            # Patient booking & dashboard
│   ├── index.tsx           # Homepage
│   ├── about.tsx           # About page
│   ├── services.tsx        # Services catalog
│   ├── doctors.tsx         # Doctor profiles
│   └── contact.tsx         # Contact page
├── components/             # Reusable React components
├── lib/                    # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── public/                 # Static assets
└── tests/e2e/             # Playwright tests
```

## Database Schema

Key models:
- **User** - Base authentication (Patient, Doctor, Admin roles)
- **Patient** - Patient-specific data and medical history
- **Doctor** - Doctor profiles, qualifications, specialty
- **DoctorAvailability** - Doctor working hours
- **Appointment** - Appointment bookings with status tracking
- **DentalService** - Service catalog with pricing
- **Payment** - Stripe payment transactions
- **AuditLog** - Audit trail for compliance

## API Endpoints

### Appointments
- `GET /api/appointments` - List appointments (role-filtered)
- `POST /api/appointments` - Book new appointment
- `GET /api/appointments/[id]` - Get appointment details
- `PATCH /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Delete (admin only)

### Doctors
- `GET /api/doctors` - List all active doctors with availability

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create service (admin only)

## Integrations

### Stripe (Payments)
Configure your Stripe keys in `.env`:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Svix (Webhooks)
For event notifications (appointment confirmations, etc.):
```
SVIX_URL=https://api.svix.com
SVIX_API_KEY=your_api_key
```

### Retraced (Audit Logs)
For compliance and audit trails:
```
RETRACED_URL=https://api.retraced.io
RETRACED_API_KEY=your_api_key
RETRACED_PROJECT_ID=your_project_id
```

## Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t toothdoctor .
docker run -p 4002:4002 toothdoctor
```

### Environment Requirements
- Node.js 20+
- PostgreSQL 16+
- npm or yarn

## Support & Documentation

- See `README_TOOTHDOCTOR.md` for detailed feature documentation
- Check `SETUP.md` for additional setup instructions
- Visit `/api/health` to check API status

## Production Checklist

Before deploying to production:

1. ✅ Update `NEXTAUTH_SECRET` with a secure random string
2. ✅ Configure production database URL
3. ✅ Set up Stripe production keys
4. ✅ Configure email SMTP settings
5. ✅ Enable SSL/HTTPS
6. ✅ Set `NODE_ENV=production`
7. ✅ Configure backup strategy for database
8. ✅ Set up monitoring and error tracking (Sentry)
9. ✅ Review and update privacy policy/terms

## License

MIT License - See LICENSE file for details
