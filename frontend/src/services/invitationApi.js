import api from './api';

export const invitationApi = {
  /**
   * Fetch public published invitation by its unique slug
   * @param {string} slug
   */
  getBySlug: (slug) => api.get(`/invitations/${encodeURIComponent(slug)}`),
};

export default invitationApi;
