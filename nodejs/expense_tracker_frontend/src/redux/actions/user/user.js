import axios from 'axios';
import { CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_ERROR, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_ERROR } from '../../constants/user/user';

const baseUrl = 'http://localhost:5000';

export const loginUserAction =
    ({ email, password }) =>
    async (dispatch, state) => {
        //1. before the API call
        dispatch({
            type: LOGIN_USER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            //make API call
            const { data } = await axios.post(`${baseUrl}/users/login`, { email, password }, config);
            //2. after the API call success
            console.log(data, 'data');
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: data.data
            });
        } catch (error) {
            //3. after the API call failure
            console.log(error);
            let message =
                error.response && error.response.data.errors ? error.response.data.errors.join(',') : error.response && error.response.data.message ? error.response.data.message : error.message;
            dispatch({
                type: LOGIN_USER_ERROR,
                payload: message
            });
        }
    };

export const createUserAction =
    ({ email, password, username }) =>
    async (dispatch, state) => {
        //1. before the API call
        dispatch({
            type: CREATE_USER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            //make API call
            const { data } = await axios.post(`${baseUrl}/users`, { email, password, username }, config);
            //2. after the API call success
            console.log(data, 'data');
            dispatch({
                type: CREATE_USER_SUCCESS,
                payload: data.data
            });
        } catch (error) {
            //3. after the API call failure
            console.log(error);
            let message =
                error.response && error.response.data.errors ? error.response.data.errors.join(',') : error.response && error.response.data.message ? error.response.data.message : error.message;
            dispatch({
                type: CREATE_USER_ERROR,
                payload: message
            });
        }
    };
