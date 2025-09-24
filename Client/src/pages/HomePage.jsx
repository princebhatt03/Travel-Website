import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    id: 1,
    title: 'Explore Hotels',
    desc: 'Find the best hotels around the world',
    icon: '🏨',
  },
  {
    id: 2,
    title: 'Book Flights',
    desc: 'Easy and fast flight booking',
    icon: '✈️',
  },
  {
    id: 3,
    title: 'Adventure Trips',
    desc: 'Exciting adventure trips for all',
    icon: '🏞️',
  },
];

const hotels = [
  {
    id: 1,
    name: 'Grand Palace Hotel',
    location: 'New York, USA',
    price: '$150/night',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
  },
  {
    id: 2,
    name: 'Beachside Resort',
    location: 'Maldives',
    price: '$200/night',
    image: 'https://images.unsplash.com/photo-1501117716987-c8e1ecb2101f?w=600',
  },
  {
    id: 3,
    name: 'Mountain View Lodge',
    location: 'Swiss Alps',
    price: '$120/night',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    feedback: 'Amazing service and beautiful hotels!',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 2,
    name: 'Jane Smith',
    feedback: 'Traveling has never been easier!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[80vh]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600')",
        }}>
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-4">
            Explore the World with Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg sm:text-xl mb-6">
            Discover the best hotels, flights and adventure trips
          </motion.p>
          <motion.button
            onClick={() => navigate('/user-register')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition">
            Get Started
          </motion.button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(feature => (
            <motion.div
              key={feature.id}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Featured Hotels
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map(hotel => (
              <motion.div
                key={hotel.id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {hotel.name}
                  </h3>
                  <p className="text-gray-600">{hotel.location}</p>
                  <p className="text-blue-600 font-bold mt-2">{hotel.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {testimonials.map(testimonial => (
            <motion.div
              key={testimonial.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md p-6 flex gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">
                  {testimonial.name}
                </h4>
                <p className="text-gray-600">{testimonial.feedback}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 Travel Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
