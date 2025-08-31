import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';

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
            path="*"
            element={<ErrorPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}
