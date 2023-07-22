import { configureStore } from '@reduxjs/toolkit';

// project imports
import globalReducer from './globalReducer';
import userReducer from "./userReducer";

export default configureStore({
    reducer: {
        user: userReducer,
        global: globalReducer,
    },
});
