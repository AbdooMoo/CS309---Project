const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const authApi = {
  login: (credentials) =>
    apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  register: (payload) =>
    apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  verifyEmail: (payload) =>
    apiRequest('/users/verify', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};

export const usersApi = {
  getAll: () => apiRequest('/users'),
  getById: (id) => apiRequest(`/users/${id}`),
  create: (payload) =>
    apiRequest('/users/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  remove: (id) =>
    apiRequest(`/users/${id}`, {
      method: 'DELETE',
    }),
};

export const coursesApi = {
  getAll: () => apiRequest('/courses'),
  create: (payload) =>
    apiRequest('/courses', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  remove: (id) =>
    apiRequest(`/courses/${id}`, {
      method: 'DELETE',
    }),
};

export const sessionsApi = {
  getAll: () => apiRequest('/sessions'),
  create: (payload) =>
    apiRequest('/sessions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/sessions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  remove: (id) =>
    apiRequest(`/sessions/${id}`, {
      method: 'DELETE',
    }),
};

export const attendanceApi = {
  getAll: () => apiRequest('/attendance'),
  create: (payload) =>
    apiRequest('/attendance', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/attendance/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  remove: (id) =>
    apiRequest(`/attendance/${id}`, {
      method: 'DELETE',
    }),
};
