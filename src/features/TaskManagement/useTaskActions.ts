import {useAppDispatch, useAppSelector} from "../../shared/hooks/reduxHooks";
import {addTask, deleteTask, editTask, filterTasks, Task} from "./taskSlice";
import { toast } from 'react-toastify';

export const useTaskActions = ( currentDayTasks?: Task[], setActiveTaskId?: (id: string | null) => void) => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const addNewTask = (newTask: Task) => {
        dispatch(addTask(newTask));
        if (setActiveTaskId) setActiveTaskId(newTask.id);
    };

    const deleteTaskById = (taskId: string) => {
        dispatch(deleteTask(taskId));
        if (setActiveTaskId && currentDayTasks) {
            const remainingTasks = currentDayTasks.filter((task) => task.id !== taskId);
            setActiveTaskId(remainingTasks.length > 0 ? remainingTasks[0].id : null);
        }
    };

    const editTaskById = (id: string, text?: string, priority?: "high" | "medium" | "low") => {
        dispatch(editTask({id, text, priority}));
    };

    const applyFilter = (searchValue: string) => {
        dispatch(filterTasks(searchValue));

        const hasTasks = tasks.some((task) =>
            task.text?.toLowerCase().includes(searchValue.toLowerCase())
        );

        if (searchValue && !hasTasks) {
            toast.info("Задачі не знайдені за цим запитом.");
        }
    };

    return {addNewTask, deleteTaskById, editTaskById, applyFilter};
};
