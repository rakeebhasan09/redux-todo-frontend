import { combineReducers } from "@reduxjs/toolkit";
import filtersReducer from "./features/filters/filters.slice";
import tasksReducer from "./features/tasks/tasks.slice";
import { baseAPI } from "./baseAPI";

export const rootReducer = combineReducers({
    [baseAPI.reducerPath]: baseAPI.reducer,
    filters: filtersReducer,
    tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
