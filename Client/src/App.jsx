import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';
import UserRegister from './pages/user/Register';
import UserLogin from './pages/user/Login';
import UserHome from './pages/user/UserHome';
import ProtectedRoute from './pages/user/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <div>
        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/user-register"
            element={<UserRegister />}
          />
          <Route
            path="/user-login"
            element={<UserLogin />}
          />
          <Route
            path="/user-home"
            element={
              <ProtectedRoute>
                <UserHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}
