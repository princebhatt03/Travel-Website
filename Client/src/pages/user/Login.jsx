import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const backendURL =
    import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(`${backendURL}/api/users/login`, {
        email: formData.email,
        password: formData.password,
      });

      // Save token or user data if backend returns it
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      toast.success('Login successful! Redirecting...');
      setFormData({ email: '', password: '' });
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      setTimeout(() => navigate('/user-home'), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Invalid credentials. Try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-500 px-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4">
          {/* Email */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </motion.div>

          {/* Password */}
          <motion.div whileFocus={{ scale: 1.02 }}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-md hover:opacity-90 transition">
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a
            href="/user-register"
            className="text-purple-600 font-semibold hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
