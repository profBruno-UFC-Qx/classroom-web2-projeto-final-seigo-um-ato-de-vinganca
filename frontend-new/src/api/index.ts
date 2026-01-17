import axios from 'axios'
export const BASE_URL = 'http://localhost:1337'


export const api = axios.create({
    baseURL: `${BASE_URL}/api`,
    timeout: 40000,
})

api.interceptors.request.use((config) => {
    const jwt = localStorage.getItem('jwt') || ''
    if (jwt.length > 0) {
        config.headers.Authorization = `Bearer ${jwt}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})


