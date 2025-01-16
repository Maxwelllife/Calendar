import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Task {
    id: string;
    text?: string;
    day?: string;
    order?: number;
    priority?: "high" | "medium" | "low";
}

interface TaskState {
    tasks: Task[];
    filter: string;
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

        editTask: (state, action: PayloadAction<Task>) => {
            const task = state.tasks.find((task) => {
                return task.id === action.payload.id
            });

            if (task) {
                if (action.payload.text !== undefined) task.text = action.payload.text;
                if (action.payload.priority !== undefined) task.priority = action.payload.priority;
                if (action.payload.day !== undefined) task.day = action.payload.day;
                if (action.payload.order !== undefined) task.order = action.payload.order;

            }
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },

        reorderTask: (state, action: PayloadAction<{ id: string; order: number }>) => {
            const taskIndex = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex].order = action.payload.order;
            }
            state.tasks.sort((a, b) => (a.order || 0) - (b.order || 0));

        },
        filterTasks: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
    },
});

export const {addTask, editTask, deleteTask, reorderTask, filterTasks} = taskSlice.actions;
export default taskSlice.reducer;
