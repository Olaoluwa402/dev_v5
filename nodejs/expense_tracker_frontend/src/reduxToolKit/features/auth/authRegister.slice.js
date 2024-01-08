import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerService } from './auth.service';

export const createUserAction = createAsyncThunk('auth/register', async ({ email, password, username }, thunkAPI) => {
    try {
        return await registerService({ email, password, username });
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
export const authRegisterSlice = createSlice({
    name: 'authRegister',
    initialState,
    reducers: {
        //non asynchronous reducers goes here
        resetRegister: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
            state.user = null;
        },

        clearErrorRegister: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createUserAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUserAction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload.data;
            })
            .addCase(createUserAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
                state.user = null;
            });
    }
});

// Action creators are generated for each case reducer function
export const { resetRegister, clearErrorRegister } = authRegisterSlice.actions;

export default authRegisterSlice.reducer;
