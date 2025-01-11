import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Task {
    id: string;
    text: string;
    day: string; // День, до якого прив'язана таска
    order: number; // Для сортування задач всередині дня
    priority?: "high" | "medium" | "low";
}

interface TaskState {
    tasks: Task[];
    filter: string; // Поле для текстового фільтру
}

const initialState: TaskState = {
    tasks: [],
    filter: '',
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            const newTask = action.payload;
            state.tasks.push(newTask);
        },

        editTask: (state, action: PayloadAction<{ id: string; text?: string; priority?: "high" | "medium" | "low"  }>) => {

            const task = state.tasks.find((task) => {
                return task.id === action.payload.id
            });

            if (task) {
                if (action.payload.text !== undefined) {
                    task.text = action.payload.text;
                }
                if (action.payload.priority !== undefined) {
                    task.priority = action.payload.priority;
                }
            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        moveTask: (state, action: PayloadAction<{ id: string; day: string; order: number }>) => {
            const task = state.tasks.find((task) => task.id === action.payload.id);
            if (task) {
                task.day = action.payload.day;
                task.order = action.payload.order;
            }
        },
        reorderTask: (state, action: PayloadAction<{ id: string; order: number }>) => {
            const task = state.tasks.find((task) => task.id === action.payload.id);
            if (task) {
                task.order = action.payload.order;
            }
        },
        filterTasks: (state, action: PayloadAction<string>) => {
            state.filter = action.payload; // Оновлюємо текстовий фільтр (зберігаємо текст у Redux)
        },
    },
});

export const {addTask, editTask, deleteTask, moveTask, reorderTask, filterTasks} = taskSlice.actions;
export default taskSlice.reducer;
