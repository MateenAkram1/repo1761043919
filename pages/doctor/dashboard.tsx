import { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import prisma from '@/lib/prisma';

interface DoctorProfile {
  id: string;
  specialty: string;
  bio: string;
  qualifications: string;
  yearsOfExperience: number;
}

export default function DoctorDashboard({ doctorProfile }: { doctorProfile: DoctorProfile }) {
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

  const addDoctorNotes = async (id: string) => {
    const notes = prompt('Enter notes for this appointment:');
    if (!notes) return;

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doctorNotes: notes }),
      });

      if (response.ok) {
        toast.success('Notes saved successfully');
        fetchAppointments();
      } else {
        toast.error('Failed to save notes');
      }
    } catch (error) {
      toast.error('Error saving notes');
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
        <title>Doctor Dashboard - ToothDoctor</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
                <p className="text-gray-600">Welcome back, Dr. {session?.user?.name}</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/" className="btn btn-ghost">Home</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Profile</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600"><strong>Specialty:</strong> {doctorProfile.specialty}</p>
                <p className="text-gray-600 mt-2"><strong>Experience:</strong> {doctorProfile.yearsOfExperience} years</p>
                <p className="text-gray-600 mt-2"><strong>Qualifications:</strong> {doctorProfile.qualifications}</p>
              </div>
              <div>
                <p className="text-gray-600"><strong>Bio:</strong></p>
                <p className="text-gray-600 mt-2">{doctorProfile.bio}</p>
              </div>
            </div>
          </div>

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
                <ClockIcon className="w-12 h-12 text-green-500" />
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
                <UserIcon className="w-12 h-12 text-blue-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {appointments.filter((apt: any) => apt.status === 'PENDING').length}
                  </p>
                </div>
                <ClockIcon className="w-12 h-12 text-orange-500" />
              </div>
            </div>
          </div>

          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Schedule</h2>
            {loading ? (
              <div className="text-center py-12">
                <div className="loading loading-spinner loading-lg"></div>
              </div>
            ) : upcomingAppointments.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No upcoming appointments</p>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment: any) => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">
                            {appointment.patient.user.name}
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
                        {appointment.doctorNotes && (
                          <p className="text-gray-600 mt-2 text-sm">
                            <strong>Notes:</strong> {appointment.doctorNotes}
                          </p>
                        )}
                        <div className="mt-2 text-sm text-gray-600">
                          <strong>Contact:</strong> {appointment.patient.user.email} | {appointment.patient.user.phone}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        {appointment.status === 'PENDING' && (
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'CONFIRMED')}
                            className="btn btn-success btn-sm text-white"
                          >
                            Confirm
                          </button>
                        )}
                        {appointment.status === 'CONFIRMED' && (
                          <button
                            onClick={() => updateAppointmentStatus(appointment.id, 'COMPLETED')}
                            className="btn btn-info btn-sm text-white"
                          >
                            Complete
                          </button>
                        )}
                        <button
                          onClick={() => addDoctorNotes(appointment.id)}
                          className="btn btn-outline btn-sm"
                        >
                          Add Notes
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Past Appointments */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Past Appointments</h2>
            {pastAppointments.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No past appointments</p>
            ) : (
              <div className="space-y-4">
                {pastAppointments.slice(0, 10).map((appointment: any) => (
                  <div key={appointment.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-800">
                            {appointment.patient.user.name}
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
                        {appointment.doctorNotes && (
                          <p className="text-gray-600 mt-2 text-sm">
                            <strong>Notes:</strong> {appointment.doctorNotes}
                          </p>
                        )}
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
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // Check if user is a doctor
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { doctorProfile: true },
  });

  if (!user || user.userRole !== 'DOCTOR' || !user.doctorProfile) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  const { locale } = context;

  return {
    props: {
      doctorProfile: {
        id: user.doctorProfile.id,
        specialty: user.doctorProfile.specialty,
        bio: user.doctorProfile.bio || '',
        qualifications: user.doctorProfile.qualifications || '',
        yearsOfExperience: user.doctorProfile.yearsOfExperience || 0,
      },
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}
