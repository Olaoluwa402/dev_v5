import axios from 'axios';
import { constants } from '../../../config/constants';

console.log(constants, 'constants');

// Register user
export const registerService = async ({ email, password, username }) => {
    const config = {
        headers: {
            'Content-Type': 'Application/json'
        },
        credentials: 'include',
        mode: 'cors'
    };

    const { data } = await axios.post(`${constants.backendBaseUrl}/users`, { email, password, username }, config);

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

    const { data } = await axios.post(`${constants.backendBaseUrl}/users/login`, { email, password }, config);

    return data;
};
