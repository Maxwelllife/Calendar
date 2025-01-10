import {useAppDispatch} from "../../shared/hooks/reduxHooks";
import {addTask, deleteTask, editTask, Task} from "./taskSlice";

export const useTaskActions = (tasks: Task[], setActiveTaskId: (id: string | null) => void) => {
    const dispatch = useAppDispatch();

    const addNewTask = (day: string) => {
        const newTask = {
            id: Date.now().toString(),
            day,
            text: "New Task",
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

    const editTaskById = (id: string, text: string) => {
        dispatch(editTask({id, text}));
    };

    return {addNewTask, deleteTaskById, editTaskById};
};
