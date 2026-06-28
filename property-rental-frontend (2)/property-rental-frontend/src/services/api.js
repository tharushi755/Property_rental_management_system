import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ========== PROPERTY APIs ==========
export const getProperties = (page = 0, size = 6, location = '', type = '') => {
  let url = `/properties?page=${page}&size=${size}`;
  if (location) url += `&location=${location}`;
  if (type) url += `&type=${type}`;
  return api.get(url);
};

export const getPropertyById = (id) => api.get(`/properties/${id}`);

export const createProperty = (property) => api.post('/properties', property);

export const updateProperty = (id, property) => api.put(`/properties/${id}`, property);

export const deleteProperty = (id) => api.delete(`/properties/${id}`);

// ========== BOOKING APIs ==========
export const createBooking = (bookingData) => api.post('/bookings', bookingData);

export const getUserBookings = (userId) => api.get(`/bookings/user/${userId}`);

export const cancelBooking = (id) => api.put(`/bookings/${id}/cancel`);

// ========== PAYMENT APIs ==========
export const processPayment = (paymentData) => api.post('/payments/process', paymentData);

export const getUserPayments = (userId) => api.get(`/payments/user/${userId}`);

export const getPaymentByTransactionId = (txnId) => api.get(`/payments/${txnId}`);

export const getAllPaymentsAdmin = () => api.get('/payments/admin/all');

export const refundPayment = (transactionId) => api.put(`/payments/${transactionId}/refund`);

// ========== USER APIs ==========
export const getUserProfile = (id) => api.get(`/users/${id}`);

export const updateUserProfile = (id, userData) => api.put(`/users/${id}`, userData);

// ========== AUTH APIs ==========
export const login = (email, password) => api.post('/auth/login', { email, password });

export const register = (userData) => api.post('/auth/register', userData);

// ========== ADMIN APIs ==========
export const getAdminStats = () => api.get('/admin/stats');

export const getAllUsers = () => api.get('/admin/users');

export const updateUserRole = (id, role) => api.put(`/admin/users/${id}/role`, { role });

export const deleteUser = (id) => api.delete(`/admin/users/${id}`);

export const getAllPropertiesAdmin = () => api.get('/admin/properties');

export const approveProperty = (id) => api.put(`/admin/properties/${id}/approve`);

export const getAllBookingsAdmin = () => api.get('/admin/bookings');

export const toggleUserStatus = (id) => api.put(`/admin/users/${id}/status`);

export default api;