#!/bin/bash

echo "🦷 ToothDoctor Setup Script"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

echo "✓ Node.js found: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✓ npm found: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✓ Dependencies installed"

# Copy .env.example to .env if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created"
    echo "⚠️  Please update .env with your configuration"
else
    echo "✓ .env file already exists"
fi

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo ""
    read -p "Do you want to start PostgreSQL with Docker? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🐳 Starting PostgreSQL container..."
        docker-compose up -d postgres
        echo "✓ PostgreSQL started"
        echo "⏳ Waiting for database to be ready..."
        sleep 5
    fi
fi

# Generate Prisma Client
echo ""
echo "🔧 Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo "✓ Prisma Client generated"

# Run migrations
echo ""
read -p "Do you want to run database migrations? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗄️  Running database migrations..."
    npx prisma migrate dev
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to run migrations"
        echo "💡 Make sure your DATABASE_URL in .env is correct"
        exit 1
    fi
    
    echo "✓ Migrations completed"
fi

# Seed database
echo ""
read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🌱 Seeding database..."
    npx prisma db seed
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to seed database"
        exit 1
    fi
    
    echo "✓ Database seeded"
fi

# Success message
echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "🚀 To start the development server, run:"
echo "   npm run dev"
echo ""
echo "📱 The application will be available at:"
echo "   http://localhost:4002"
echo ""
echo "👤 Default login credentials:"
echo "   Admin:   admin@toothdoctor.com / admin123"
echo "   Doctor:  sarah.johnson@toothdoctor.com / doctor123"
echo "   Patient: john.doe@example.com / patient123"
echo ""
echo "📚 For more information, see README_TOOTHDOCTOR.md and SETUP.md"
echo ""
