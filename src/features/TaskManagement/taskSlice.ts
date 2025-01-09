import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

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
        addTask: (state, action: PayloadAction<{ day: string; text: string }>) => {
            const newTask: Task = {
                id: uuidv4(),
                day: action.payload.day,
                text: action.payload.text,
                order: state.tasks.filter(task => task.day === action.payload.day).length + 1, // Додаємо в кінець
            };
            state.tasks.push(newTask);
        },
        editTask: (state, action: PayloadAction<{ id: string; text: string }>) => {

            const task = state.tasks.find((task) => {
                return task.id === action.payload.id
            });

            if (task) {
                task.text = action.payload.text;
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
            state.filter = action.payload; // Оновлюємо текстовий фільтр
        },
    },
});

export const {addTask, editTask, deleteTask, moveTask, reorderTask, filterTasks} = taskSlice.actions;
export default taskSlice.reducer;
