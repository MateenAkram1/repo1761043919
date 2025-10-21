import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    if (req.method === 'GET') {
      // Get appointments
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
          patientProfile: true,
          doctorProfile: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      let appointments;

      if (user.userRole === 'PATIENT' && user.patientProfile) {
        // Get patient's appointments
        appointments = await prisma.appointment.findMany({
          where: { patientId: user.patientProfile.id },
          include: {
            doctor: {
              include: {
                user: true,
              },
            },
            service: true,
          },
          orderBy: { appointmentDate: 'desc' },
        });
      } else if (user.userRole === 'DOCTOR' && user.doctorProfile) {
        // Get doctor's appointments
        appointments = await prisma.appointment.findMany({
          where: { doctorId: user.doctorProfile.id },
          include: {
            patient: {
              include: {
                user: true,
              },
            },
            service: true,
          },
          orderBy: { appointmentDate: 'desc' },
        });
      } else if (user.userRole === 'STAFF_ADMIN') {
        // Get all appointments for admin
        appointments = await prisma.appointment.findMany({
          include: {
            patient: {
              include: {
                user: true,
              },
            },
            doctor: {
              include: {
                user: true,
              },
            },
            service: true,
          },
          orderBy: { appointmentDate: 'desc' },
        });
      } else {
        return res.status(403).json({ error: 'Forbidden' });
      }

      return res.status(200).json(appointments);
    } else if (req.method === 'POST') {
      // Create new appointment
      const { doctorId, serviceId, appointmentDate, startTime, endTime, reasonForVisit } = req.body;

      if (!doctorId || !appointmentDate || !startTime || !endTime) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: { patientProfile: true },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create patient profile if it doesn't exist
      let patient = user.patientProfile;
      if (!patient) {
        patient = await prisma.patient.create({
          data: {
            userId: user.id,
          },
        });
      }

      // Check for conflicting appointments
      const conflictingAppointment = await prisma.appointment.findFirst({
        where: {
          doctorId,
          appointmentDate: new Date(appointmentDate),
          startTime,
          status: {
            notIn: ['CANCELLED'],
          },
        },
      });

      if (conflictingAppointment) {
        return res.status(400).json({ error: 'This time slot is already booked' });
      }

      const appointment = await prisma.appointment.create({
        data: {
          patientId: patient.id,
          doctorId,
          serviceId: serviceId || null,
          userId: user.id,
          appointmentDate: new Date(appointmentDate),
          startTime,
          endTime,
          reasonForVisit: reasonForVisit || null,
          status: 'PENDING',
        },
        include: {
          doctor: {
            include: {
              user: true,
            },
          },
          service: true,
        },
      });

      // Create audit log
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'CREATE',
          entity: 'Appointment',
          entityId: appointment.id,
          changes: {
            appointment,
          },
        },
      });

      return res.status(201).json(appointment);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Appointments API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
