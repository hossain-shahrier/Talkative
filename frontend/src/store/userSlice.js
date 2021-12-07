import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    avatar: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        setAvatar: (state, action) => {
            state.avatar = action.payload;
        },
    },
});

export const {setAvatar } = userSlice.actions;

export default userSlice.reducer;