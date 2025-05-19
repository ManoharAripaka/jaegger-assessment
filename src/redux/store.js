import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./reducer";

export const store = configureStore({
    reducer: {
        data: dataSlice
    }
});