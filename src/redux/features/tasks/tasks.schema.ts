import { TASK_PRIORITY, TASK_STATUS } from "./tasks.constant";
import type { ITaskInput } from "./tasks.type";

export const taskFormDefaultValues: ITaskInput = {
    title: "",
    description: "",
    status: TASK_STATUS[0],
    priority: TASK_PRIORITY[0],
};
