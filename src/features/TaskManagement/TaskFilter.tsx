import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../shared/hooks/reduxHooks';
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

    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterTasks(event.target.value));
    };

    return (
        <FilterContainer>
            <FilterInput
                type="text"
                placeholder="Search tasks..."
                onChange={handleFilterChange}
            />
        </FilterContainer>
    );
};

export default TaskFilter;
