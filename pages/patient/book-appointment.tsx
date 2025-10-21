import { useState, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { getAuthOptions } from '@/lib/nextAuth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function BookAppointment() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    doctorId: '',
    serviceId: '',
    appointmentDate: '',
    startTime: '',
    endTime: '',
    reasonForVisit: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [doctorsRes, servicesRes] = await Promise.all([
        fetch('/api/doctors'),
        fetch('/api/services'),
      ]);

      if (doctorsRes.ok) {
        const doctorsData = await doctorsRes.json();
        setDoctors(doctorsData);
      }

      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        setServices(servicesData);
      }
    } catch (error) {
      toast.error('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Auto-calculate end time based on service duration
    if (name === 'serviceId' && value) {
      const selectedService = services.find((s: any) => s.id === value);
      if (selectedService && formData.startTime) {
        const [hours, minutes] = formData.startTime.split(':').map(Number);
        const endDate = new Date();
        endDate.setHours(hours);
        endDate.setMinutes(minutes + (selectedService as any).duration);
        const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
        setFormData((prev) => ({ ...prev, endTime }));
      }
    }

    if (name === 'startTime' && formData.serviceId) {
      const selectedService = services.find((s: any) => s.id === formData.serviceId);
      if (selectedService && value) {
        const [hours, minutes] = value.split(':').map(Number);
        const endDate = new Date();
        endDate.setHours(hours);
        endDate.setMinutes(minutes + (selectedService as any).duration);
        const endTime = `${String(endDate.getHours()).padStart(2, '0')}:${String(endDate.getMinutes()).padStart(2, '0')}`;
        setFormData((prev) => ({ ...prev, endTime }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Appointment booked successfully!');
        router.push('/patient/dashboard');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to book appointment');
      }
    } catch (error) {
      toast.error('Error booking appointment');
    } finally {
      setSubmitting(false);
    }
  };

  // Generate time slots (9 AM to 5 PM, 30-minute intervals)
  const timeSlots: string[] = [];
  for (let hour = 9; hour < 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      timeSlots.push(time);
    }
  }

  return (
    <>
      <Head>
        <title>Book Appointment - ToothDoctor</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Book Appointment</h1>
                <p className="text-gray-600">Schedule your visit with us</p>
              </div>
              <div className="flex space-x-4">
                <Link href="/patient/dashboard" className="btn btn-ghost">Back to Dashboard</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="loading loading-spinner loading-lg"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Doctor *
                  </label>
                  <select
                    id="doctorId"
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    required
                    className="select select-bordered w-full"
                  >
                    <option value="">Choose a doctor</option>
                    {doctors.map((doctor: any) => (
                      <option key={doctor.id} value={doctor.id}>
                        Dr. {doctor.user.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Service
                  </label>
                  <select
                    id="serviceId"
                    name="serviceId"
                    value={formData.serviceId}
                    onChange={handleChange}
                    className="select select-bordered w-full"
                  >
                    <option value="">Choose a service (optional)</option>
                    {services.map((service: any) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - ${service.price} ({service.duration} min)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Date *
                  </label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time *
                    </label>
                    <select
                      id="startTime"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                      className="select select-bordered w-full"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                      End Time *
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                      readOnly={!!formData.serviceId}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reasonForVisit" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Visit
                  </label>
                  <textarea
                    id="reasonForVisit"
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleChange}
                    rows={4}
                    className="textarea textarea-bordered w-full"
                    placeholder="Please describe your symptoms or reason for visit..."
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Link href="/patient/dashboard" className="btn btn-ghost">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary text-white"
                  >
                    {submitting ? 'Booking...' : 'Book Appointment'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, getAuthOptions(context.req, context.res));

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
