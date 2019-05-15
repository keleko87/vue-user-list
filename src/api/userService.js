
import { API_URL, USERS, apiRequest } from '@/api/base';

export default {
  getUsers() {
    const url = `${API_URL}${USERS}/getusers`;
    const request = {
      url,
      method: 'GET',
    };

    return apiRequest(request);
  },

  createUser(data) {
    const url = `${API_URL}${USERS}/createUsers`;
    const request = {
      url,
      method: 'POST',
      data,
    };

    return apiRequest(request);
  },

  getUser(userId) {
    const url = `${API_URL}${USERS}/getusersById/${userId}`;
    const request = {
      url,
      method: 'GET',
    };

    return apiRequest(request);
  },

  updateUser(userId, data) {
    const url = `${API_URL}${USERS}/updateUsersById/${userId}`;
    const request = {
      url,
      method: 'PUT',
      data,
    };

    return apiRequest(request);
  },

  deleteUser(userId) {
    const url = `${API_URL}${USERS}/deleteUsersById/${userId}`;
    const request = {
      url,
      method: 'DELETE',
    };

    return apiRequest(request);
  },
};
