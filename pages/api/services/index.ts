import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { getAuthOptions } from '@/lib/nextAuth';
import { prisma } from '@/lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const services = await prisma.dentalService.findMany({
        where: { isActive: true },
        orderBy: {
          name: 'asc',
        },
      });

      return res.status(200).json(services);
    } else if (req.method === 'POST') {
      const authOptions = getAuthOptions(req, res);
      const session = await getServerSession(req, res, authOptions);

      if (!session || !session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await prisma.user.findUnique({
        where: { email: session.user.email! },
      });

      if (!user || user.userRole !== 'STAFF_ADMIN') {
        return res.status(403).json({ error: 'Only administrators can create services' });
      }

      const { name, description, price, duration } = req.body;

      if (!name || !description || !price || !duration) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const service = await prisma.dentalService.create({
        data: {
          name,
          description,
          price,
          duration: parseInt(duration),
          isActive: true,
        },
      });

      // Create audit log
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: 'CREATE',
          entity: 'DentalService',
          entityId: service.id,
          changes: {
            service,
          },
        },
      });

      return res.status(201).json(service);
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Services API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
