import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Register user
export const registerService = async ({ email, password, username }) => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        },
        credentials: 'include',
        mode: 'cors'
    };

    const { data } = await axios.post(`${API_URL}/users`, { email, password, username }, config);

    return data;
};

export const loginService = async ({ email, password }) => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        },
        credentials: 'include',
        mode: 'cors'
    };

    const { data } = await axios.post(`${API_URL}/users/login`, { email, password }, config);

    return data;
};
