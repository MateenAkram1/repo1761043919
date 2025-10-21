import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding ToothDoctor database...');

  // Create admin user
  const adminPassword = await hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@toothdoctor.com' },
    update: {},
    create: {
      email: 'admin@toothdoctor.com',
      name: 'Admin User',
      password: adminPassword,
      emailVerified: new Date(),
      userRole: 'STAFF_ADMIN',
      phone: '(555) 123-4567',
    },
  });

  console.log('✓ Created admin user');

  // Create doctors
  const doctorsData = [
    {
      email: 'sarah.johnson@toothdoctor.com',
      name: 'Sarah Johnson',
      specialty: 'General Dentistry',
      bio: 'Dr. Johnson has over 15 years of experience in general dentistry. She specializes in preventive care and cosmetic dentistry.',
      qualifications: 'DDS from Harvard School of Dental Medicine',
      yearsOfExperience: 15,
    },
    {
      email: 'michael.chen@toothdoctor.com',
      name: 'Michael Chen',
      specialty: 'Orthodontics',
      bio: 'Dr. Chen is a board-certified orthodontist specializing in both traditional braces and modern clear aligner systems.',
      qualifications: 'DMD, MS in Orthodontics',
      yearsOfExperience: 12,
    },
    {
      email: 'emily.rodriguez@toothdoctor.com',
      name: 'Emily Rodriguez',
      specialty: 'Pediatric Dentistry',
      bio: 'Dr. Rodriguez is passionate about creating positive dental experiences for children.',
      qualifications: 'DDS, Pediatric Dentistry Certificate',
      yearsOfExperience: 10,
    },
    {
      email: 'james.williams@toothdoctor.com',
      name: 'James Williams',
      specialty: 'Oral Surgery',
      bio: 'Dr. Williams specializes in complex oral surgeries including dental implants and wisdom teeth extraction.',
      qualifications: 'DDS, Oral Surgery Specialty',
      yearsOfExperience: 18,
    },
  ];

  for (const doctorData of doctorsData) {
    const password = await hash('doctor123', 12);
    const user = await prisma.user.upsert({
      where: { email: doctorData.email },
      update: {},
      create: {
        email: doctorData.email,
        name: doctorData.name,
        password,
        emailVerified: new Date(),
        userRole: 'DOCTOR',
        phone: '(555) 123-4567',
      },
    });

    await prisma.doctor.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        specialty: doctorData.specialty,
        bio: doctorData.bio,
        qualifications: doctorData.qualifications,
        yearsOfExperience: doctorData.yearsOfExperience,
        isActive: true,
      },
    });

    // Create availability for each doctor (Monday to Friday, 9 AM to 5 PM)
    for (let day = 1; day <= 5; day++) {
      await prisma.doctorAvailability.create({
        data: {
          doctorId: (await prisma.doctor.findUnique({ where: { userId: user.id } }))!.id,
          dayOfWeek: day,
          startTime: '09:00',
          endTime: '17:00',
          isAvailable: true,
        },
      });
    }
  }

  console.log('✓ Created doctors and availability');

  // Create patients
  const patientsData = [
    {
      email: 'john.doe@example.com',
      name: 'John Doe',
      phone: '(555) 234-5678',
      dateOfBirth: new Date('1985-05-15'),
    },
    {
      email: 'jane.smith@example.com',
      name: 'Jane Smith',
      phone: '(555) 345-6789',
      dateOfBirth: new Date('1990-08-22'),
    },
    {
      email: 'bob.wilson@example.com',
      name: 'Bob Wilson',
      phone: '(555) 456-7890',
      dateOfBirth: new Date('1978-12-10'),
    },
  ];

  for (const patientData of patientsData) {
    const password = await hash('patient123', 12);
    const user = await prisma.user.upsert({
      where: { email: patientData.email },
      update: {},
      create: {
        email: patientData.email,
        name: patientData.name,
        password,
        emailVerified: new Date(),
        userRole: 'PATIENT',
        phone: patientData.phone,
      },
    });

    await prisma.patient.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        dateOfBirth: patientData.dateOfBirth,
        address: '123 Main St, Anytown, USA',
        emergencyContact: '(555) 999-9999',
      },
    });
  }

  console.log('✓ Created patients');

  // Create dental services
  const services = [
    {
      name: 'General Checkup',
      description: 'Comprehensive oral examination to assess your dental health',
      price: 75,
      duration: 30,
    },
    {
      name: 'Teeth Cleaning',
      description: 'Professional cleaning to remove plaque and tartar',
      price: 100,
      duration: 45,
    },
    {
      name: 'Teeth Whitening',
      description: 'Professional whitening treatment for a brighter smile',
      price: 250,
      duration: 60,
    },
    {
      name: 'Root Canal',
      description: 'Treatment to save infected or damaged teeth',
      price: 500,
      duration: 90,
    },
    {
      name: 'Dental Implants',
      description: 'Permanent solution for missing teeth',
      price: 1500,
      duration: 120,
    },
    {
      name: 'Orthodontics Consultation',
      description: 'Initial consultation for braces or aligners',
      price: 100,
      duration: 45,
    },
    {
      name: 'Emergency Care',
      description: 'Immediate care for dental emergencies',
      price: 150,
      duration: 60,
    },
    {
      name: 'Pediatric Checkup',
      description: 'Specialized dental care for children',
      price: 60,
      duration: 30,
    },
  ];

  for (const service of services) {
    const existing = await prisma.dentalService.findFirst({
      where: { name: service.name },
    });
    
    if (!existing) {
      await prisma.dentalService.create({
        data: {
          name: service.name,
          description: service.description,
          price: service.price,
          duration: service.duration,
          isActive: true,
        },
      });
    }
  }

  console.log('✓ Created dental services');

  // Create sample appointments
  const doctors = await prisma.doctor.findMany({ include: { user: true } });
  const patients = await prisma.patient.findMany({ include: { user: true } });
  const dentalServices = await prisma.dentalService.findMany();

  if (doctors.length > 0 && patients.length > 0) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    // Upcoming appointment
    await prisma.appointment.create({
      data: {
        patientId: patients[0].id,
        doctorId: doctors[0].id,
        serviceId: dentalServices[0]?.id,
        userId: patients[0].userId,
        appointmentDate: tomorrow,
        startTime: '10:00',
        endTime: '10:30',
        status: 'CONFIRMED',
        reasonForVisit: 'Regular checkup',
      },
    });

    // Pending appointment
    await prisma.appointment.create({
      data: {
        patientId: patients[1]?.id || patients[0].id,
        doctorId: doctors[1]?.id || doctors[0].id,
        serviceId: dentalServices[1]?.id,
        userId: patients[1]?.userId || patients[0].userId,
        appointmentDate: nextWeek,
        startTime: '14:00',
        endTime: '14:45',
        status: 'PENDING',
        reasonForVisit: 'Teeth cleaning',
      },
    });

    console.log('✓ Created sample appointments');
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
