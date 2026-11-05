import api from './api';

export const adminApi = {
  // Stats
  getStats: () => api.get('/admin/stats'),

  // Orders
  getOrders: (params = {}) => api.get('/admin/orders', { params }),
  getOrderById: (id) => api.get(`/admin/orders/${id}`),
  updateOrder: (id, data) => api.put(`/admin/orders/${id}`, data),

  // Invitations
  getInvitations: (params = {}) => api.get('/admin/invitations', { params }),
  getInvitationById: (id) => api.get(`/admin/invitations/${id}`),
  createInvitation: (data) => api.post('/admin/invitations', data),
  updateInvitation: (id, data) => api.put(`/admin/invitations/${id}`, data),
  publishInvitation: (id) => api.post(`/admin/invitations/${id}/publish`),
  unpublishInvitation: (id) => api.post(`/admin/invitations/${id}/unpublish`),
  archiveInvitation: (id) => api.delete(`/admin/invitations/${id}`),
};

export default adminApi;
