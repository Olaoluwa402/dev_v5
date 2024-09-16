import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerService, loginService } from './auth.service';
import { toast } from 'react-toastify';

export const registerAction = createAsyncThunk('auth/register', async ({ email, password, username }, thunkAPI) => {
    try {
        return await registerService({ email, password, username });
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.warning(`${message}`);
        return thunkAPI.rejectWithValue(message);
    }
});

export const loginAction = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        return await loginService({ email, password });
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        toast.warning(`${message}`);
        return thunkAPI.rejectWithValue(message);
    }
});

const initialState = {
    user: null,
    error: null,
    loading: false,
    success: false
};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        //non asynchronous reducers goes here
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.data;
            })
            .addCase(registerAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.user = null;
            })
            .addCase(loginAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.data;
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.user = null;
            });
    }
});

// Action creators are generated for each case reducer function
export const { reset } = authSlice.actions;

export default authSlice.reducer;
