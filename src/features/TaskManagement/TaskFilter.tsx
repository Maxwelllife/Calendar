import React from 'react';
import {useAppSelector} from '../../shared/hooks/reduxHooks';
import {FilterInput} from "./styles/TaskFilter.styles";
import {useTaskActions} from "./useTaskActions";

const TaskFilter: React.FC = () => {

    const filter = useAppSelector((state) => state.tasks.filter);
    const {applyFilter} = useTaskActions();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        applyFilter(event.target.value);
    };

    return (
        <FilterInput
            type="text"
            value={filter}
            placeholder="Search tasks..."
            onChange={handleChange}
        />
    );
};

export default TaskFilter;
