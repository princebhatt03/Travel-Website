import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const UserHeader = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/user-login');
  };

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Section - Logo or App Name */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-gray-800 cursor-pointer"
          onClick={() => navigate('/')}>
          User Dashboard
        </motion.h1>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4">
          {user ? (
            <>
              {/* User Name */}
              <span className="hidden sm:block font-medium text-gray-700">
                {user.name}
              </span>

              {/* Profile Photo */}
              <img
                src={
                  user.profilePhoto
                    ? `${
                        import.meta.env.VITE_BACKEND_URL ||
                        'http://localhost:3000'
                      }${user.profilePhoto}`
                    : 'https://via.placeholder.com/40x40.png?text=U'
                }
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
              />

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/user-login')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                Login
              </button>
              <button
                onClick={() => navigate('/user-register')}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                Register
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default UserHeader;
