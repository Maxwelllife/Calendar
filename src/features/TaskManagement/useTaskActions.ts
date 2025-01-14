import {useAppDispatch} from "../../shared/hooks/reduxHooks";
import {addTask, deleteTask, editTask, Task} from "./taskSlice";
import {v4 as uuidv4} from 'uuid';

export const useTaskActions = (tasks: Task[], setActiveTaskId: (id: string | null) => void) => {
    const dispatch = useAppDispatch();

    const addNewTask = (day: string) => {
        const newTask = {
            id: uuidv4(),
            day,
            text: "Click to edit",
            order: tasks.length + 1,
        };

        dispatch(addTask(newTask));
        setActiveTaskId(newTask.id); // Робимо нову таску активною
    };

    const deleteTaskById = (taskId: string) => {
        dispatch(deleteTask(taskId));
        const remainingTasks = tasks.filter((task) => task.id !== taskId);
        if (remainingTasks.length > 0) {
            setActiveTaskId(remainingTasks[0].id); // Встановлюємо наступну таску активною
        } else {
            setActiveTaskId(null); // Якщо завдань більше немає
        }
    };

    const editTaskById = (id: string, text?: string, priority?: "high" | "medium" | "low") => {
        dispatch(editTask({id, text, priority}));
    };

    return {addNewTask, deleteTaskById, editTaskById};
};
