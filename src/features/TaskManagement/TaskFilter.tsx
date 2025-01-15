import React from 'react';
import { useAppSelector} from '../../shared/hooks/reduxHooks';
import {FilterContainer, FilterInput} from "./styles/TaskFilter.styles";
import {useTaskActions} from "./useTaskActions";

const TaskFilter: React.FC = () => {

    const filter = useAppSelector((state) => state.tasks.filter);
    const { applyFilter } = useTaskActions();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        applyFilter(event.target.value); // Оновлюємо текст фільтра
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
