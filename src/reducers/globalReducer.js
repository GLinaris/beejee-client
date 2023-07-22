import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'global',
    initialState: {
        tasks: []
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setDone: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            task.done = action.payload.done;
        }
    },
})

export const getTasks = (state) => state.global.tasks;
export const getGlobal = (state) => state.global;
export const {
    setTasks,
    setDone
} = userSlice.actions;
export default userSlice.reducer;
