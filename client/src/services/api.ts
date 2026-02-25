import axios from 'axios';

// Uses Vite proxy in dev — no hardcoded localhost:5000
const api = axios.create({
    baseURL: '/api',
});

export const scanWebsite = async (url: string) => {
    const { data } = await api.post('/scan', { url });
    return data;
};

export const compareWebsites = async (url1: string, url2: string) => {
    const { data } = await api.post('/compare', { url1, url2 });
    return data;
};

export const fetchHistory = async () => {
    const { data } = await api.get('/history');
    return data;
};

export default api;
