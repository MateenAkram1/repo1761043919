import Link from 'next/link';
import { type ReactElement } from 'react';
import type { NextPageWithLayout } from 'types';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

const Services: NextPageWithLayout = () => {
  const services = [
    {
      name: 'General Checkup',
      icon: '🔍',
      price: '$75',
      duration: '30 min',
      description: 'Comprehensive oral examination to assess your dental health and identify any potential issues early.',
      features: ['Oral examination', 'Digital X-rays', 'Treatment planning', 'Preventive care advice']
    },
    {
      name: 'Teeth Cleaning',
      icon: '✨',
      price: '$100',
      duration: '45 min',
      description: 'Professional cleaning to remove plaque, tartar, and stains for a brighter, healthier smile.',
      features: ['Deep cleaning', 'Plaque removal', 'Polishing', 'Fluoride treatment']
    },
    {
      name: 'Teeth Whitening',
      icon: '⭐',
      price: '$250',
      duration: '60 min',
      description: 'Professional whitening treatment to brighten your smile by several shades.',
      features: ['Professional bleaching', 'Custom trays', 'Take-home kit', 'Long-lasting results']
    },
    {
      name: 'Root Canal',
      icon: '🦷',
      price: '$500',
      duration: '90 min',
      description: 'Advanced treatment to save infected or damaged teeth and relieve pain.',
      features: ['Pain relief', 'Infection removal', 'Tooth preservation', 'Crown placement']
    },
    {
      name: 'Dental Implants',
      icon: '💎',
      price: '$1,500',
      duration: '120 min',
      description: 'Permanent solution for missing teeth with natural-looking and durable implants.',
      features: ['Titanium implants', 'Custom crowns', 'Permanent solution', 'Natural appearance']
    },
    {
      name: 'Orthodontics',
      icon: '😊',
      price: '$3,000',
      duration: '12-24 months',
      description: 'Straighten your teeth with traditional braces or modern clear aligners.',
      features: ['Braces options', 'Clear aligners', 'Regular adjustments', 'Retention plan']
    },
    {
      name: 'Emergency Care',
      icon: '🚨',
      price: '$150',
      duration: '60 min',
      description: 'Immediate care for dental emergencies including severe pain, injuries, or infections.',
      features: ['Same-day service', 'Pain management', 'Urgent treatment', '24/7 availability']
    },
    {
      name: 'Pediatric Dentistry',
      icon: '👶',
      price: '$60',
      duration: '30 min',
      description: 'Specialized dental care for children in a friendly, comfortable environment.',
      features: ['Child-friendly care', 'Preventive treatments', 'Education', 'Gentle approach']
    },
    {
      name: 'Dental Crowns',
      icon: '👑',
      price: '$800',
      duration: '90 min',
      description: 'Restore damaged teeth with custom-made crowns for strength and aesthetics.',
      features: ['Custom design', 'Durable materials', 'Natural look', 'Long-lasting']
    },
    {
      name: 'Veneers',
      icon: '✨',
      price: '$1,200',
      duration: '120 min',
      description: 'Transform your smile with custom porcelain veneers for a perfect appearance.',
      features: ['Porcelain shells', 'Custom fit', 'Stain-resistant', 'Beautiful results']
    },
    {
      name: 'Gum Treatment',
      icon: '🌸',
      price: '$300',
      duration: '60 min',
      description: 'Comprehensive treatment for gum disease and periodontal health.',
      features: ['Deep cleaning', 'Scaling', 'Root planing', 'Maintenance plan']
    },
    {
      name: 'Wisdom Teeth Removal',
      icon: '🦷',
      price: '$400',
      duration: '90 min',
      description: 'Safe and comfortable extraction of wisdom teeth under sedation if needed.',
      features: ['Surgical extraction', 'Sedation options', 'Post-op care', 'Pain management']
    }
  ];

  return (
    <>
      <Head>
        <title>Our Services - ToothDoctor</title>
        <meta name="description" content="Comprehensive dental services for the whole family" />
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
                <Link href="/services" className="text-blue-600 font-semibold">Services</Link>
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
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive dental care for every stage of life. From routine checkups to advanced procedures.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6">
                  <div className="text-6xl text-center mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">{service.name}</h3>
                  <div className="flex justify-center items-center space-x-4 text-gray-600">
                    <span className="font-bold text-blue-600 text-xl">{service.price}</span>
                    <span>•</span>
                    <span>{service.duration}</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link href="/auth/join" className="btn btn-primary btn-block text-white">
                      Book Now
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
            <h2 className="text-4xl font-bold text-white mb-6">Not Sure Which Service You Need?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact us for a free consultation and we'll help you find the right treatment
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/contact" className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50">
                Contact Us
              </Link>
              <Link href="/auth/join" className="btn btn-lg btn-outline text-white border-white hover:bg-blue-700">
                Book Appointment
              </Link>
            </div>
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

Services.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Services;
