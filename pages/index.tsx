import Link from 'next/link';
import { type ReactElement } from 'react';
import { useTranslation } from 'next-i18next';
import type { NextPageWithLayout } from 'types';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { 
  CalendarDaysIcon, 
  UserGroupIcon, 
  CreditCardIcon, 
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const Home: NextPageWithLayout = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <title>ToothDoctor - Modern Dental Care</title>
        <meta name="description" content="Professional dental care with easy online booking and modern treatment options" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🦷</span>
                </div>
                <span className="text-2xl font-bold text-blue-600">ToothDoctor</span>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
                <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
                <Link href="/services" className="text-gray-700 hover:text-blue-600 transition">Services</Link>
                <Link href="/doctors" className="text-gray-700 hover:text-blue-600 transition">Our Doctors</Link>
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
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-800 mb-6">
                Your Smile is Our Priority
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Experience modern dental care with easy online booking, expert doctors, 
                and comprehensive services for the whole family.
              </p>
              <div className="flex space-x-4">
                <Link href="/auth/join" className="btn btn-primary btn-lg text-white">
                  Book Appointment
                </Link>
                <Link href="/services" className="btn btn-outline btn-lg">
                  Our Services
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">😁</div>
                    <h3 className="text-2xl font-bold text-gray-800">Healthy Smiles</h3>
                    <p className="text-gray-600">Start Your Journey Today</p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                      <span className="text-gray-700">Expert Dental Care</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                      <span className="text-gray-700">Modern Equipment</span>
                    </div>
                    <div className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                      <CheckCircleIcon className="w-6 h-6 text-blue-600" />
                      <span className="text-gray-700">Affordable Pricing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose ToothDoctor?</h2>
              <p className="text-xl text-gray-600">Modern dental care made simple and accessible</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6">
                  <CalendarDaysIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Easy Booking</h3>
                <p className="text-gray-600">
                  Book appointments online 24/7. Choose your preferred date, time, and doctor with just a few clicks.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6">
                  <UserGroupIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Doctors</h3>
                <p className="text-gray-600">
                  Our team of experienced dentists provides comprehensive care with the latest techniques and technology.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                  <CreditCardIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Secure Payments</h3>
                <p className="text-gray-600">
                  Pay online securely with multiple payment options. Track your payment history in your dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive dental care for the whole family</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'General Checkup', icon: '🔍', price: '$75' },
              { name: 'Teeth Cleaning', icon: '✨', price: '$100' },
              { name: 'Teeth Whitening', icon: '⭐', price: '$250' },
              { name: 'Root Canal', icon: '🦷', price: '$500' },
              { name: 'Dental Implants', icon: '💎', price: '$1,500' },
              { name: 'Orthodontics', icon: '😊', price: '$3,000' },
              { name: 'Emergency Care', icon: '🚨', price: '$150' },
              { name: 'Pediatric Dentistry', icon: '👶', price: '$60' },
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{service.name}</h3>
                <p className="text-blue-600 font-bold text-xl">{service.price}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="btn btn-primary btn-lg text-white">
              View All Services
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Book your appointment today and experience quality dental care
            </p>
            <Link href="/auth/join" className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50">
              Book Your Appointment
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">🦷</span>
                  </div>
                  <span className="text-xl font-bold">ToothDoctor</span>
                </div>
                <p className="text-gray-400">
                  Professional dental care for the whole family
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                  <li><Link href="/services" className="text-gray-400 hover:text-white">Services</Link></li>
                  <li><Link href="/doctors" className="text-gray-400 hover:text-white">Our Doctors</Link></li>
                  <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contact</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center space-x-2">
                    <PhoneIcon className="w-5 h-5" />
                    <span>(555) 123-4567</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <EnvelopeIcon className="w-5 h-5" />
                    <span>info@toothdoctor.com</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <MapPinIcon className="w-5 h-5" />
                    <span>123 Dental St, Suite 100</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Office Hours</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Monday - Friday: 8am - 6pm</li>
                  <li>Saturday: 9am - 4pm</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 ToothDoctor. All rights reserved.</p>
            </div>
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

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Home;
