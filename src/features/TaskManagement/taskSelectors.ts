import { createSelector } from 'reselect';
import { RootState } from '../../app/store';

// Базові селектори
const selectTasks = (state: RootState) => state.tasks.tasks;
const selectFilter = (state: RootState) => state.tasks.filter;

// Мемоізований селектор для фільтрованих задач
export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilter],
    (tasks, filter) =>
        tasks.filter((task) =>
            task.text.toLowerCase().includes(filter.toLowerCase())
        )
);
