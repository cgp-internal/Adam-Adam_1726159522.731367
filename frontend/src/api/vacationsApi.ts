import axios, { AxiosError } from 'axios';

const apiToken = localStorage.getItem('token');

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization: `Bearer ${apiToken}`,
  },
});

api.interceptors.push({
  request: (config) => config,
  response: (response) => response,
  error: (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
});

const getVacations = async (): Promise<Vacation[]> => {
  try {
    const response = await api.get('/vacations');
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getVacation = async (id: number): Promise<Vacation | null> => {
  try {
    const response = await api.get(`/vacations/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { getVacations, getVacation };