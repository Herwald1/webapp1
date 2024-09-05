import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${ import.meta.env.VITE_API_BASE_URL }/api`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use( (response) => {
    return response;
}, (error) => {
    const {response} = error;
    if (error.response.status === 401) {
        localStorage.removeItem("token");
    }
    throw error; 

});

export default axiosClient;