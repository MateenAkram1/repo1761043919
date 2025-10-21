import Link from 'next/link';
import { type ReactElement } from 'react';
import type { NextPageWithLayout } from 'types';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { 
  HeartIcon, 
  UserGroupIcon, 
  AcademicCapIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const About: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>About Us - ToothDoctor</title>
        <meta name="description" content="Learn about ToothDoctor's mission and our expert dental team" />
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
                <Link href="/about" className="text-blue-600 font-semibold">About</Link>
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
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold text-white mb-6">About ToothDoctor</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Providing exceptional dental care with compassion, expertise, and cutting-edge technology since 2020
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              At ToothDoctor, we believe everyone deserves access to high-quality dental care. 
              Our mission is to provide comprehensive, compassionate dental services while making 
              the experience as comfortable and convenient as possible. We combine modern technology 
              with personalized care to ensure every patient leaves with a healthy, beautiful smile.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
              <p className="text-xl text-gray-600">What drives us every day</p>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeartIcon className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Compassion</h3>
                <p className="text-gray-600">
                  We treat every patient with kindness, understanding, and respect
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AcademicCapIcon className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Excellence</h3>
                <p className="text-gray-600">
                  We maintain the highest standards in dental care and service
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <SparklesIcon className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We embrace the latest technology and techniques in dentistry
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserGroupIcon className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Community</h3>
                <p className="text-gray-600">
                  We're committed to serving and giving back to our community
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl font-bold text-blue-600 mb-2">5+</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl font-bold text-purple-600 mb-2">15+</div>
              <div className="text-gray-600">Expert Dentists</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl shadow-lg">
              <div className="text-5xl font-bold text-orange-600 mb-2">25+</div>
              <div className="text-gray-600">Services Offered</div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="text-lg mb-6">
                  ToothDoctor was founded in 2020 with a simple vision: to revolutionize dental care 
                  by combining cutting-edge technology with personalized, compassionate service. What 
                  started as a small practice with just three dentists has grown into a comprehensive 
                  dental care center serving thousands of patients.
                </p>
                <p className="text-lg mb-6">
                  Our founders, Dr. Sarah Johnson and Dr. Michael Chen, recognized the need for a 
                  modern dental practice that prioritizes patient comfort and convenience. They 
                  implemented online booking systems, digital treatment plans, and state-of-the-art 
                  equipment to make dental care more accessible and less intimidating.
                </p>
                <p className="text-lg">
                  Today, ToothDoctor continues to lead the way in innovative dental care. We've 
                  expanded our team to include specialists in orthodontics, periodontics, pediatric 
                  dentistry, and oral surgery. Our commitment to excellence and patient satisfaction 
                  remains at the heart of everything we do.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Join Our Family</h2>
            <p className="text-xl text-blue-100 mb-8">
              Experience the ToothDoctor difference today
            </p>
            <Link href="/auth/join" className="btn btn-lg bg-white text-blue-600 hover:bg-blue-50">
              Book Your First Appointment
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

About.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default About;
