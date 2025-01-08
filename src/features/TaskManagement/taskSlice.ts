// src/features/TaskManagement/taskSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: string;
    text: string;
    day: string; // День, до якого прив'язана задача
    order: number; // Для сортування задач всередині дня
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
            state.tasks.push(action.payload);
        },
        editTask: (state, action: PayloadAction<{ id: string; text: string }>) => {
            const task = state.tasks.find((task) => task.id === action.payload.id);
            if (task) {
                task.text = action.payload.text;
            }
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
            state.filter = action.payload; // Оновлюємо текстовий фільтр
        },
    },
});

export const { addTask, editTask, moveTask, reorderTask, filterTasks } = taskSlice.actions;
export default taskSlice.reducer;
