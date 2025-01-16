import { createSelector } from 'reselect';
import { RootState } from '../../app/store';

const selectTasks = (state: RootState) => state.tasks.tasks;

const selectFilter = (state: RootState) => state.tasks.filter;

export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilter],
    (tasks, filter) => tasks.filter((task) => task.text?.toLowerCase().includes(filter.toLowerCase()))
);