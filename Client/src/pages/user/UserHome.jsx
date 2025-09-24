import React from 'react';
import UserHeader from '../../components/UserHeader';

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

const UserHome = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <UserHeader />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Featured Hotels
          </h2>

          {/* Hotel Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map(hotel => (
              <div
                key={hotel.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
