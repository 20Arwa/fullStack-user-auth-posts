import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
    headers: {
        "Content-Type": "application/json"
    }
})

// If Token Exist, Automaticly Send It To interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
    }, (error) => {
    return Promise.reject(error)
})

// If Token Expires > Log Out
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const token = localStorage.getItem("token")

        if (
        token &&
        error.response?.status === 401 &&
        error.response?.data?.message === "Token expired"
        ) {
        localStorage.removeItem("token")
        window.location.href = "/login"
        }

        return Promise.reject(error)
    }
)

export default api