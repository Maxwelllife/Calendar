import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../shared/hooks/reduxHooks';
import { fetchHolidaysAsync } from '../features/Calendar/asyncActions';
import TaskFilter from '../features/TaskManagement/TaskFilter';
import Calendar from "../features/Calendar/Calendar";


const PageContainer = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    min-height: 100vh;

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }
`;

const CalendarPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        dispatch(fetchHolidaysAsync(currentYear));
    }, [dispatch, currentYear]);

    return (
        <PageContainer>
            <h1>Task Calendar</h1>
            <TaskFilter />
            <Calendar></Calendar>
        </PageContainer>
    );
};

export default CalendarPage;
