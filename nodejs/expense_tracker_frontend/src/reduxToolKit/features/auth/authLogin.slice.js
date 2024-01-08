import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginService } from './auth.service';

export const loginUserAction = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        return await loginService({ email, password });
    } catch (error) {
        const message =
            error.response && error.response.data.errors ? error.response.data.errors.join(',') : error.response && error.response.data.message ? error.response.data.message : error.message;

        return thunkAPI.rejectWithValue(message);
    }
});

const initialState = {
    user: null,
    error: null,
    loading: false,
    success: false
};
export const authLoginSlice = createSlice({
    name: 'authLogin',
    initialState,
    reducers: {
        //non asynchronous reducers goes here
        resetLogin: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.user = null;
        },

        clearErrorLogin: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder

            .addCase(loginUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = { data: action.payload.data, token: action.payload.token };
            })
            .addCase(loginUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.user = null;
            });
    }
});

// Action creators are generated for each case reducer function
export const { resetLogin, clearErrorLogin } = authLoginSlice.actions;

export default authLoginSlice.reducer;
