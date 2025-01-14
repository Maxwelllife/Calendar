import React from 'react';
import {useAppDispatch, useAppSelector} from '../../shared/hooks/reduxHooks';
import { filterTasks } from './taskSlice';
import {FilterContainer, FilterInput} from "./styles/TaskFilter.styles";

const TaskFilter: React.FC = () => {
    const dispatch = useAppDispatch();
    const filter = useAppSelector((state) => state.tasks.filter);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterTasks(event.target.value)); // Оновлюємо текст фільтра
    };

    return (
        <FilterContainer>
            <FilterInput
                type="text"
                value={filter}
                placeholder="Search tasks..."
                onChange={handleChange}
            />
        </FilterContainer>
    );
};

export default TaskFilter;
