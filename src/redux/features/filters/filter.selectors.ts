import type { RootState } from "@/redux/store";

export const selectFilters = (state: RootState) => state.filters;
export const selectPriority = (state: RootState) => state.filters.priority;
export const selectQuery = (state: RootState) => state.filters.query;
export const selectStatusFilter = (state: RootState) => state.filters.status;
export const selectSortMode = (state: RootState) => state.filters.sort;
