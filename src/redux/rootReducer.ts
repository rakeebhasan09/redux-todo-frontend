import { combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/tasks.slice";
import filtersReducer from "./features/filters/filters.slice";
import { persistReducer } from "redux-persist";

const storage = {
    getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
    setItem: (key: string, value: string) =>
        Promise.resolve(localStorage.setItem(key, value)),
    removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
};

const persistConfig = {
    key: "redux-store",
    storage,
    whitelist: ["tasks"],
};

export const combineReducer = combineReducers({
    tasks: tasksReducer,
    filters: filtersReducer,
});

export const rootReducer = persistReducer(persistConfig, combineReducer);
