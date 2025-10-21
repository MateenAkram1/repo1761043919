import Link from 'next/link';
import { type ReactElement } from 'react';
import type { NextPageWithLayout } from 'types';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';

const Doctors: NextPageWithLayout = () => {
  const doctors = [
    {
      name: 'Dr. Sarah Johnson',
      specialty: 'General Dentistry',
      image: '👩‍⚕️',
      bio: 'Dr. Johnson has over 15 years of experience in general dentistry. She specializes in preventive care and cosmetic dentistry.',
      qualifications: 'DDS from Harvard School of Dental Medicine',
      experience: '15+ years',
      email: 'sarah.johnson@toothdoctor.com',
      phone: '(555) 123-4567'
    },
    {
      name: 'Dr. Michael Chen',
      specialty: 'Orthodontics',
      image: '👨‍⚕️',
      bio: 'Dr. Chen is a board-certified orthodontist specializing in both traditional braces and modern clear aligner systems.',
      qualifications: 'DMD, MS in Orthodontics',
      experience: '12+ years',
      email: 'michael.chen@toothdoctor.com',
      phone: '(555) 123-4568'
    },
    {
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatric Dentistry',
      image: '👩‍⚕️',
      bio: 'Dr. Rodriguez is passionate about creating positive dental experiences for children. She makes every visit fun and educational.',
      qualifications: 'DDS, Pediatric Dentistry Certificate',
      experience: '10+ years',
      email: 'emily.rodriguez@toothdoctor.com',
      phone: '(555) 123-4569'
    },
    {
      name: 'Dr. James Williams',
      specialty: 'Oral Surgery',
      image: '👨‍⚕️',
      bio: 'Dr. Williams specializes in complex oral surgeries including dental implants, wisdom teeth extraction, and jaw surgery.',
      qualifications: 'DDS, Oral Surgery Specialty',
      experience: '18+ years',
      email: 'james.williams@toothdoctor.com',
      phone: '(555) 123-4570'
    },
    {
      name: 'Dr. Lisa Park',
      specialty: 'Periodontics',
      image: '👩‍⚕️',
      bio: 'Dr. Park focuses on the prevention, diagnosis, and treatment of gum disease and the placement of dental implants.',
      qualifications: 'DDS, MS in Periodontics',
      experience: '14+ years',
      email: 'lisa.park@toothdoctor.com',
      phone: '(555) 123-4571'
    },
    {
      name: 'Dr. David Kumar',
      specialty: 'Cosmetic Dentistry',
      image: '👨‍⚕️',
      bio: 'Dr. Kumar is an expert in cosmetic procedures including veneers, whitening, and smile makeovers.',
      qualifications: 'DDS, Advanced Aesthetic Dentistry',
      experience: '11+ years',
      email: 'david.kumar@toothdoctor.com',
      phone: '(555) 123-4572'
    }
  ];

  return (
    <>
      <Head>
        <title>Our Doctors - ToothDoctor</title>
        <meta name="description" content="Meet our team of expert dentists and specialists" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🦷</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">ToothDoctor</span>
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
                <Link href="/services" className="text-gray-700 hover:text-blue-600 transition">Services</Link>
                <Link href="/doctors" className="text-blue-600 font-semibold">Our Doctors</Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
              </div>
              <div className="flex space-x-4">
                <Link href="/auth/login" className="btn btn-ghost btn-sm">Sign In</Link>
                <Link href="/auth/join" className="btn btn-primary btn-sm text-white">Book Appointment</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Our Expert Team</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Meet our highly qualified dentists and specialists dedicated to your oral health
            </p>
          </div>
        </section>

        {/* Doctors Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8">
                  <div className="text-8xl text-center mb-4">{doctor.image}</div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">{doctor.name}</h3>
                  <p className="text-blue-100 text-center font-semibold">{doctor.specialty}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{doctor.bio}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start space-x-2">
                      <span className="text-blue-600 font-semibold">📚</span>
                      <div>
                        <div className="font-semibold text-gray-800">Qualifications</div>
                        <div className="text-gray-600 text-sm">{doctor.qualifications}</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-green-600 font-semibold">⭐</span>
                      <div>
                        <div className="font-semibold text-gray-800">Experience</div>
                        <div className="text-gray-600 text-sm">{doctor.experience}</div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <EnvelopeIcon className="w-4 h-4" />
                      <span>{doctor.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <PhoneIcon className="w-4 h-4" />
                      <span>{doctor.phone}</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Link href="/auth/join" className="btn btn-primary btn-block text-white">
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Meet Your Dentist?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Book an appointment with one of our expert doctors today
            </p>
            <Link href="/auth/join" className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50">
              Book Your Appointment
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 ToothDoctor. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { locale } = context;

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
};

Doctors.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Doctors;
