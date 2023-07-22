import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
    },
    reducers: {
        signin: (state) => {
            state.isAuth = true;
        },
        signout: (state) => {
            state.isAuth = false;
        },
    },
})

export const getIsAuth = (state) => state.user.isAuth;
export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
