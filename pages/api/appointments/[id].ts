import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { getAuthOptions } from '@/lib/nextAuth';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authOptions = getAuthOptions(req, res);
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid appointment ID' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        patientProfile: true,
        doctorProfile: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.method === 'GET') {
      const appointment = await prisma.appointment.findUnique({
        where: { id },
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
          payment: true,
        },
      });

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      // Check authorization
      const isPatient = user.patientProfile?.id === appointment.patientId;
      const isDoctor = user.doctorProfile?.id === appointment.doctorId;
      const isAdmin = user.userRole === 'STAFF_ADMIN';

      if (!isPatient && !isDoctor && !isAdmin) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      return res.status(200).json(appointment);
    } else if (req.method === 'PATCH') {
      const { status, appointmentDate, startTime, endTime, doctorNotes, cancelReason } = req.body;

      const appointment = await prisma.appointment.findUnique({
        where: { id },
      });

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      // Check authorization
      const isPatient = user.patientProfile?.id === appointment.patientId;
      const isDoctor = user.doctorProfile?.id === appointment.doctorId;
      const isAdmin = user.userRole === 'STAFF_ADMIN';

      if (!isPatient && !isDoctor && !isAdmin) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      // Build update data
      const updateData: any = {};

      if (status) {
        // Patients can only cancel, doctors and admins can update any status
        if (status === 'CANCELLED' || isDoctor || isAdmin) {
          updateData.status = status;
          if (status === 'CANCELLED') {
            updateData.cancelledAt = new Date();
            updateData.cancelReason = cancelReason || null;
          }
        } else {
          return res.status(403).json({ error: 'You can only cancel appointments' });
        }
      }

      if (appointmentDate && (isPatient || isAdmin)) {
        updateData.appointmentDate = new Date(appointmentDate);
      }

      if (startTime && (isPatient || isAdmin)) {
        updateData.startTime = startTime;
      }

      if (endTime && (isPatient || isAdmin)) {
        updateData.endTime = endTime;
      }

      if (doctorNotes && (isDoctor || isAdmin)) {
        updateData.doctorNotes = doctorNotes;
      }

      const updatedAppointment = await prisma.appointment.update({
        where: { id },
        data: updateData,
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
      });

      // Create audit log
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'UPDATE',
          entity: 'Appointment',
          entityId: id,
          changes: {
            before: appointment,
            after: updatedAppointment,
          },
        },
      });

      return res.status(200).json(updatedAppointment);
    } else if (req.method === 'DELETE') {
      // Only admins can delete appointments
      if (user.userRole !== 'STAFF_ADMIN') {
        return res.status(403).json({ error: 'Only administrators can delete appointments' });
      }

      const appointment = await prisma.appointment.findUnique({
        where: { id },
      });

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      await prisma.appointment.delete({
        where: { id },
      });

      // Create audit log
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'DELETE',
          entity: 'Appointment',
          entityId: id,
          changes: {
            deleted: appointment,
          },
        },
      });

      return res.status(200).json({ message: 'Appointment deleted successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Appointment API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
