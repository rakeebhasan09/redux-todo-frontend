import type { RootState } from "@/redux/store";
import { createSelector } from "@reduxjs/toolkit";
import { selectFilters } from "../filters";

export const selectAllTasks = (state: RootState) => state.tasks;
export const selectTotalTasks = (state: RootState) => state.tasks.length;

export const selectTaskById = (state: RootState, id: string) =>
    state.tasks.find((task) => task.id === id);

export const selectTaskStats = createSelector([selectAllTasks], (tasks) => {
    const stats = {
        total: tasks.length,
        byStatus: { pending: 0, "in-progress": 0, done: 0 },
        byPriority: { high: 0, medium: 0, low: 0 },
    };

    for (const task of tasks) {
        stats.byPriority[task.priority] += 1;
        stats.byStatus[task.status] += 1;
    }

    stats.total = tasks.length;

    return stats;
});

export const selectFilteredTasks = createSelector(
    [selectAllTasks, selectFilters],
    (tasks, filters) => {
        const { query, priority, status, sort } = filters;
        const filtered = tasks.filter((task) => {
            const serchTerm = query.trim().toLocaleLowerCase();
            // Filter by Priority
            if (priority !== "all" && task.priority !== priority) {
                return false;
            }

            // Filter by Status
            if (status !== "all" && task.status !== status) {
                return false;
            }

            // Filter by Query
            if (serchTerm) {
                const text =
                    `${task.title} ${task.description}`.toLocaleLowerCase();
                if (!text.includes(serchTerm)) {
                    return false;
                }
            }

            return true;
        });

        const sorted = [...filtered];
        switch (sort) {
            case "newest":
                sorted.sort((a, b) => b.createdAt - a.createdAt);
                break;

            case "oldest":
                sorted.sort((a, b) => a.createdAt - b.createdAt);
                break;
        }
        return sorted;
    },
);
