import { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '@/lib/nextAuth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CalendarIcon, ClockIcon, UserIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

export default function PatientDashboard() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const cancelAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'CANCELLED',
          cancelReason: 'Cancelled by patient',
        }),
      });

      if (response.ok) {
        toast.success('Appointment cancelled successfully');
        fetchAppointments();
      } else {
        toast.error('Failed to cancel appointment');
      }
    } catch (error) {
      toast.error('Error cancelling appointment');
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

  const upcomingAppointments = appointments.filter((apt: any) => 
    new Date(apt.appointmentDate) >= new Date() && apt.status !== 'CANCELLED' && apt.status !== 'COMPLETED'
  );

  const pastAppointments = appointments.filter((apt: any) => 
    new Date(apt.appointmentDate) < new Date() || apt.status === 'CANCELLED' || apt.status === 'COMPLETED'
  );

  return (
    <>
      <Head>
        <title>My Dashboard - ToothDoctor</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Patient Dashboard</h1>
                <p className="text-gray-600">Welcome back, {session?.user?.name}</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/" className="btn btn-ghost">Home</Link>
                <Link href="/patient/book-appointment" className="btn btn-primary text-white">
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Appointments</p>
                  <p className="text-3xl font-bold text-gray-800">{appointments.length}</p>
                </div>
                <CalendarIcon className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Upcoming</p>
                  <p className="text-3xl font-bold text-green-600">{upcomingAppointments.length}</p>
                </div>
                <CheckCircleIcon className="w-12 h-12 text-green-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {appointments.filter((apt: any) => apt.status === 'COMPLETED').length}
                  </p>
                </div>
                <CheckCircleIcon className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Cancelled</p>
                  <p className="text-3xl font-bold text-red-600">
                    {appointments.filter((apt: any) => apt.status === 'CANCELLED').length}
                  </p>
                </div>
                <XCircleIcon className="w-12 h-12 text-red-500" />
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Appointments</h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="loading loading-spinner loading-lg"></div>
              </div>
            ) : upcomingAppointments.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No upcoming appointments</p>
                <Link href="/patient/book-appointment" className="btn btn-primary text-white">
                  Book Your First Appointment
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment: any) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">
                            Dr. {appointment.doctor.user.name}
                          </h3>
                          <span className={getStatusBadge(appointment.status)}>{appointment.status}</span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4" />
                            <span>{appointment.startTime} - {appointment.endTime}</span>
                          </div>
                          {appointment.service && (
                            <div className="flex items-center space-x-2">
                              <UserIcon className="w-4 h-4" />
                              <span>{appointment.service.name}</span>
                            </div>
                          )}
                        </div>
                        {appointment.reasonForVisit && (
                          <p className="text-gray-600 mt-2 text-sm">
                            <strong>Reason:</strong> {appointment.reasonForVisit}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {appointment.status === 'PENDING' || appointment.status === 'CONFIRMED' ? (
                          <button
                            onClick={() => cancelAppointment(appointment.id)}
                            className="btn btn-error btn-sm text-white"
                          >
                            Cancel
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Appointment History</h2>
            {pastAppointments.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No past appointments</p>
            ) : (
              <div className="space-y-4">
                {pastAppointments.map((appointment: any) => (
                  <div key={appointment.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">
                            Dr. {appointment.doctor.user.name}
                          </h3>
                          <span className={getStatusBadge(appointment.status)}>{appointment.status}</span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{new Date(appointment.appointmentDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <ClockIcon className="w-4 h-4" />
                            <span>{appointment.startTime} - {appointment.endTime}</span>
                          </div>
                          {appointment.service && (
                            <div className="flex items-center space-x-2">
                              <UserIcon className="w-4 h-4" />
                              <span>{appointment.service.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const authOptions = getAuthOptions(context.req, context.res);
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  const { locale } = context;

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}
