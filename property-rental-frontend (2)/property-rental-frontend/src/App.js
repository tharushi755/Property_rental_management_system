import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import DestinationPage from './pages/DestinationPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminProperties from './pages/admin/AdminProperties';
import AdminBookings from './pages/admin/AdminBookings';
import AdminLayout from './pages/admin/AdminLayout';
import AddPropertyPage from './pages/AddPropertyPage';
import './App.css';

function AppContent() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const handleBooking = (property, checkIn, checkOut, guests) => {
    const nights = checkIn && checkOut ? Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) : 3;
    const totalPrice = property.price * nights + 65;
    
    const newBooking = {
      id: Date.now(),
      propertyId: property.id,
      property: property.title,
      checkIn: checkIn || '2024-12-01',
      checkOut: checkOut || '2024-12-04',
      guests: guests,
      price: totalPrice,
      status: 'Confirmed',
      bookingDate: new Date().toISOString()
    };
    
    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    alert(`✅ Booking confirmed for ${property.title}! Check your dashboard.`);
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetailPage user={user} onBooking={handleBooking} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
          <Route path="/dashboard" element={user ? <DashboardPage user={user} bookings={bookings} /> : <Navigate to="/login" />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={user ? <CheckoutPage /> : <Navigate to="/login" />} />
          <Route path="/destination/:slug" element={<DestinationPage />} />
          <Route path="/add-property" element={user && (user.role === 'OWNER' || user.role === 'ADMIN') ? <AddPropertyPage /> : <Navigate to="/" />} />
          
          {/* Admin Routes with Layout */}
          <Route path="/admin" element={isAdmin ? <AdminLayout /> : <Navigate to="/" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="properties" element={<AdminProperties />} />
            <Route path="bookings" element={<AdminBookings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <AppContent />
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;