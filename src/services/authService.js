import axios from "axios";

const AUTH_BASE_URL = "http://localhost:5151";

const authService = {
    login: (loginData) => {
        return axios.post(
            `${AUTH_BASE_URL}/auth/login`,
            loginData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    },

    register: (userData) => {
        return axios.post(
            `${AUTH_BASE_URL}/users/register`,
            userData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    },

    logout: (userId) => { 
        return axios.post( 
            `${AUTH_BASE_URL}/auth/logout/${userId}` 
        ); 
    },
};

export default authService;