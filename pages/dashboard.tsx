import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { getAuthOptions } from '@/lib/nextAuth';
import { prisma } from '@/lib/prisma';

export default function Dashboard() {
  // This component will never render as we redirect in getServerSideProps
  return null;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, getAuthOptions(context.req, context.res));

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // Get user role and redirect to appropriate dashboard
  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  });

  if (!user) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // Redirect based on user role
  switch (user.userRole) {
    case 'STAFF_ADMIN':
      return {
        redirect: {
          destination: '/admin/dashboard',
          permanent: false,
        },
      };
    case 'DOCTOR':
      return {
        redirect: {
          destination: '/doctor/dashboard',
          permanent: false,
        },
      };
    case 'PATIENT':
    default:
      return {
        redirect: {
          destination: '/patient/dashboard',
          permanent: false,
        },
      };
  }
};
