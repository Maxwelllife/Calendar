import React from 'react';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '../../shared/hooks/reduxHooks';
import { filterTasks } from './taskSlice';

const FilterContainer = styled.div`
    margin-bottom: 20px;
`;

const FilterInput = styled.input`
    //width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

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
