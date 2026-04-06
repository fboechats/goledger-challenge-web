import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization: `Basic ${btoa(`${import.meta.env.VITE_USER}:${import.meta.env.VITE_PASSWORD}`)}`,
    },
})