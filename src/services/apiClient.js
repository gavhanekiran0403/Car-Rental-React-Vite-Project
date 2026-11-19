import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:5151",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add JWT token
apiClient.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Handle unauthorized response
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("loggedUser");
        }

        return Promise.reject(error);
    }
);

export default apiClient;