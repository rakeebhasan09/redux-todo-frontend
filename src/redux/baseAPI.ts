import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAPI = createApi({
    reducerPath: "baseAPI",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => ({ url: "/tasks" }),
        }),
        createTask: build.mutation({
            query: (body) => ({
                url: "/tasks",
                method: "POST",
                body,
            }),
        }),
    }),
});

export const { useGetTasksQuery, useCreateTaskMutation } = baseAPI;
