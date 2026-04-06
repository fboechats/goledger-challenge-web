import axios from 'axios';

const isProd = import.meta.env.PROD

export const api = axios.create({
    baseURL: isProd
        ? '/api'
        : import.meta.env.VITE_BASE_URL,
    headers: isProd
        ? {}
        : {
            Authorization: `Basic ${btoa(
                `${import.meta.env.VITE_USER}:${import.meta.env.VITE_PASSWORD}`
            )}`,
        },
});