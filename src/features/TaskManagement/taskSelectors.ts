import { createSelector } from 'reselect';
import { RootState } from '../../app/store';

// Базовий селектор для завдань
const selectTasks = (state: RootState) => state.tasks.tasks;

// Фабричний селектор для завдань за датою
export const makeSelectTasksByDate = () => {
        return createSelector(
            [selectTasks, (_, date: string) => date],
            (tasks, date) => tasks.filter((task) => task.day === date)
        );
};
