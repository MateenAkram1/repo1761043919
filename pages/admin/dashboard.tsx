import { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { 
  CalendarIcon, 
  UserGroupIcon, 
  CreditCardIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon 
} from '@heroicons/react/24/outline';
import prisma from '@/lib/prisma';

interface AdminDashboardProps {
  stats: {
    totalAppointments: number;
    pendingAppointments: number;
    totalPatients: number;
    totalDoctors: number;
    totalRevenue: number;
  };
}

export default function AdminDashboard({ stats }: AdminDashboardProps) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        toast.error('Failed to fetch appointments');
      }
    } catch (error) {
      toast.error('Error loading appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        toast.success(`Appointment ${status.toLowerCase()} successfully`);
        fetchAppointments();
      } else {
        toast.error('Failed to update appointment');
      }
    } catch (error) {
      toast.error('Error updating appointment');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      PENDING: 'badge badge-warning',
      CONFIRMED: 'badge badge-success',
      CANCELLED: 'badge badge-error',
      COMPLETED: 'badge badge-info',
      NO_SHOW: 'badge badge-error',
    };
    return badges[status as keyof typeof badges] || 'badge';
  };

  const filteredAppointments = filterStatus === 'all' 
    ? appointments 
    : appointments.filter((apt: any) => apt.status === filterStatus);

  return (
    <>
      <Head>
        <title>Admin Dashboard - ToothDoctor</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Manage clinic operations</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/" className="btn btn-ghost">Home</Link>
                <Link href="/admin/services" className="btn btn-outline">Manage Services</Link>
                <Link href="/admin/doctors" className="btn btn-outline">Manage Doctors</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Appointments</p>
                  <p className="text-3xl font-bold text-gray-800">{stats.totalAppointments}</p>
                </div>
                <CalendarIcon className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pendingAppointments}</p>
                </div>
                <ClockIcon className="w-12 h-12 text-orange-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Patients</p>
                  <p className="text-3xl font-bold text-green-600">{stats.totalPatients}</p>
                </div>
                <UserGroupIcon className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Doctors</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.totalDoctors}</p>
                </div>
                <UserGroupIcon className="w-12 h-12 text-purple-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-blue-600">${stats.totalRevenue.toFixed(2)}</p>
                </div>
                <CreditCardIcon className="w-12 h-12 text-blue-500" />
              </div>
            </div>
          </div>

          {/* Appointments Management */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="select select-bordered"
              >
                <option value="all">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
                <option value="NO_SHOW">No Show</option>
              </select>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="loading loading-spinner loading-lg"></div>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No appointments found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Date & Time</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppointments.map((appointment: any) => (
                      <tr key={appointment.id}>
                        <td>
                          <div>
                            <div className="font-bold">
                              {new Date(appointment.appointmentDate).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              {appointment.startTime} - {appointment.endTime}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="font-semibold">{appointment.patient.user.name}</div>
                            <div className="text-sm text-gray-500">{appointment.patient.user.email}</div>
                          </div>
                        </td>
                        <td>
                          <div>
                            <div className="font-semibold">Dr. {appointment.doctor.user.name}</div>
                            <div className="text-sm text-gray-500">{appointment.doctor.specialty}</div>
                          </div>
                        </td>
                        <td>{appointment.service?.name || '-'}</td>
                        <td>
                          <span className={getStatusBadge(appointment.status)}>
                            {appointment.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex space-x-2">
                            {appointment.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => updateAppointmentStatus(appointment.id, 'CONFIRMED')}
                                  className="btn btn-success btn-xs text-white"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => updateAppointmentStatus(appointment.id, 'CANCELLED')}
                                  className="btn btn-error btn-xs text-white"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {appointment.status === 'CONFIRMED' && (
                              <button
                                onClick={() => updateAppointmentStatus(appointment.id, 'COMPLETED')}
                                className="btn btn-info btn-xs text-white"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // Check if user is admin
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user || user.userRole !== 'STAFF_ADMIN') {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  // Fetch statistics
  const [totalAppointments, pendingAppointments, totalPatients, totalDoctors, payments] = await Promise.all([
    prisma.appointment.count(),
    prisma.appointment.count({ where: { status: 'PENDING' } }),
    prisma.patient.count(),
    prisma.doctor.count(),
    prisma.payment.findMany({ where: { status: 'COMPLETED' } }),
  ]);

  const totalRevenue = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);

  const { locale } = context;

  return {
    props: {
      stats: {
        totalAppointments,
        pendingAppointments,
        totalPatients,
        totalDoctors,
        totalRevenue,
      },
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}
