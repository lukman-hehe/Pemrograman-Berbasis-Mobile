import axios from 'axios';
const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const itemService = {
  getAllItems: async () => {
    try {
      const response = await api.get('/items');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  createItem: async (itemData) => {
    try {
      const response = await api.post('/items', itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateItem: async (id, itemData) => {
    try {
      const response = await api.put(`/items/${id}`, itemData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteItem: async (id) => {
    try {
      const response = await api.delete(`/items/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;