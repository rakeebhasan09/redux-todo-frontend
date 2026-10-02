import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseAPI = createApi({
    reducerPath: "baseAPI",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    endpoints: (build) => ({
        getTasks: build.query({
            query: () => ({ url: "/tasks" }),
        }),
    }),
});

export const { useGetTasksQuery } = baseAPI;
