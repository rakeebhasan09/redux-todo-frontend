import { TaskItem } from "./TaskItem";
import { Card } from "@/components/ui/card";
import { ClipboardListIcon, FilterIcon } from "lucide-react";
import { selectFilters } from "@/redux/features/filters";
// import { selectFilteredTasks } from "@/redux/features/tasks/tasks.selector";
import { useAppSelector } from "@/redux/hooks";
import { useGetTasksQuery } from "@/redux/baseAPI";

export function TaskList({ onEdit }: { onEdit: (id: string) => void }) {
    const { data, isLoading, isFetching } = useGetTasksQuery(undefined);

    // console.log("taskData", taskData);

    const tasks = data?.data ?? [];
    const pagination = data?.pagination;

    const total = tasks.length;

    const filters = useAppSelector(selectFilters);
    const isFiltering =
        Boolean(filters.query.trim()) ||
        filters.priority !== "all" ||
        filters.status !== "all";

    if (total === 0) {
        return (
            <Card className="flex flex-col items-center gap-2 px-6 py-12 text-center text-muted-foreground">
                <ClipboardListIcon className="size-8" />
                <p className="font-medium text-foreground">No tasks yet</p>
                <p className="text-sm">Click "New Task" to get started.</p>
            </Card>
        );
    }

    if (tasks.length === 0) {
        return (
            <Card className="flex flex-col items-center gap-2 px-6 py-12 text-center text-muted-foreground">
                <FilterIcon className="size-8" />
                <p className="font-medium text-foreground">No matches</p>
                <p className="text-sm">
                    {isFiltering
                        ? "Try clearing or adjusting the filters."
                        : "Nothing matches the current view."}
                </p>
            </Card>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} onEdit={onEdit} />
            ))}
        </div>
    );
}
