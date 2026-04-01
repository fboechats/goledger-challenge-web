import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://ec2-50-19-36-138.compute-1.amazonaws.com',
    headers: {
        Authorization: `Basic ${btoa('goledger:5NxVCAjC')}`,
    },
})