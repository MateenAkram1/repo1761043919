# ToothDoctor - Dental Clinic Management System

ToothDoctor is a comprehensive web application for managing dental clinic operations, built with Next.js, TypeScript, Prisma, and PostgreSQL.

## 🦷 Features

### For Patients
- **Online Appointment Booking** - Book appointments 24/7 with preferred doctors
- **Patient Dashboard** - View upcoming and past appointments
- **Appointment Management** - Cancel or reschedule appointments online
- **Service Catalog** - Browse dental services with pricing
- **Secure Payments** - Pay for services online via Stripe

### For Doctors
- **Doctor Dashboard** - Manage schedule and view appointments
- **Patient Information** - Access patient details and medical history
- **Appointment Notes** - Add private notes for each appointment
- **Profile Management** - Update bio, specialty, and availability

### For Administrators
- **Admin Dashboard** - Complete clinic management interface
- **Appointment Management** - Approve, confirm, cancel appointments
- **Patient Management** - View and manage patient records
- **Doctor Management** - Manage doctor profiles and schedules
- **Service Management** - Add, edit, and price dental services
- **Payment Tracking** - Monitor all transactions and payments
- **Audit Logs** - Track all critical actions and changes

## 🚀 Tech Stack

- **Frontend/Backend**: Next.js 15 with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with DaisyUI
- **Payments**: Stripe
- **Webhooks**: Svix
- **Audit Logs**: Retraced
- **SSO**: SAML Jackson
- **Testing**: Playwright
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

- Node.js 20+
- PostgreSQL 16+
- npm or yarn
- Docker (optional)

## 🛠️ Installation

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials and other configuration.

4. **Set up the database**
   ```bash
   # Create the database
   createdb toothdoctor

   # Run migrations
   npx prisma migrate dev

   # Seed the database with sample data
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:4002`

### Option 2: Docker

1. **Start all services**
   ```bash
   docker-compose up -d
   ```

2. **Run database migrations**
   ```bash
   docker-compose exec app npx prisma migrate dev
   ```

3. **Seed the database**
   ```bash
   docker-compose exec app npx prisma db seed
   ```

The application will be available at `http://localhost:4002`

## 👥 Default Users

After seeding the database, you can login with these credentials:

### Admin
- Email: `admin@toothdoctor.com`
- Password: `admin123`
- Access: Full clinic management

### Doctors
- Email: `sarah.johnson@toothdoctor.com`
- Email: `michael.chen@toothdoctor.com`
- Email: `emily.rodriguez@toothdoctor.com`
- Email: `james.williams@toothdoctor.com`
- Password: `doctor123`
- Access: Doctor dashboard and patient management

### Patients
- Email: `john.doe@example.com`
- Email: `jane.smith@example.com`
- Email: `bob.wilson@example.com`
- Password: `patient123`
- Access: Booking appointments and patient dashboard

## 📁 Project Structure

```
/
├── pages/                    # Next.js pages and API routes
│   ├── api/                 # API endpoints
│   │   ├── appointments/    # Appointment management
│   │   ├── doctors/         # Doctor endpoints
│   │   └── services/        # Service endpoints
│   ├── admin/              # Admin dashboard
│   ├── doctor/             # Doctor dashboard
│   ├── patient/            # Patient dashboard and booking
│   ├── about.tsx           # About page
│   ├── services.tsx        # Services page
│   ├── doctors.tsx         # Doctors page
│   ├── contact.tsx         # Contact page
│   └── index.tsx           # Homepage
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data
├── components/             # Reusable React components
├── lib/                    # Utility functions
└── public/                 # Static assets
```

## 🗄️ Database Schema

Key models:
- **User** - Base user with authentication
- **Patient** - Patient-specific data
- **Doctor** - Doctor profiles and qualifications
- **DoctorAvailability** - Doctor working hours
- **Appointment** - Appointment bookings
- **DentalService** - Service catalog
- **Payment** - Payment transactions
- **AuditLog** - Audit trail

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control (Patient, Doctor, Admin)
- Account lockout after failed login attempts
- Audit logging for critical actions
- Secure payment processing with Stripe

## 🧪 Testing

Run end-to-end tests:
```bash
npm run test:e2e
```

## 📊 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run test` - Run tests
- `npm run test:e2e` - Run Playwright E2E tests
- `npx prisma studio` - Open Prisma Studio (database GUI)
- `npx prisma migrate dev` - Run database migrations
- `npx prisma db seed` - Seed the database

## 🔄 API Endpoints

### Appointments
- `GET /api/appointments` - List appointments (filtered by role)
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/[id]` - Get appointment details
- `PATCH /api/appointments/[id]` - Update appointment
- `DELETE /api/appointments/[id]` - Delete appointment (admin only)

### Doctors
- `GET /api/doctors` - List all active doctors

### Services
- `GET /api/services` - List all services
- `POST /api/services` - Create service (admin only)

## 🎨 Customization

### Branding
Update the logo and colors in:
- `/public/logo.png` - Logo image
- `/tailwind.config.js` - Color scheme
- `/pages/index.tsx` - Homepage content

### Email Templates
Email templates are in `/components/emailTemplates/`

## 🚢 Deployment

### Vercel
```bash
vercel deploy
```

### Docker
```bash
docker build -t toothdoctor .
docker run -p 4002:4002 toothdoctor
```

## 📝 Environment Variables

See `.env.example` for all required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for NextAuth.js
- `STRIPE_SECRET_KEY` - Stripe API key
- `SVIX_API_KEY` - Svix webhook key
- `RETRACED_API_KEY` - Retraced audit log key

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email support@toothdoctor.com or open an issue on GitHub.

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Stripe](https://stripe.com/)
- [BoxyHQ SaaS Starter Kit](https://github.com/boxyhq/saas-starter-kit)
