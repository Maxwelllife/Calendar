import React, { useEffect } from 'react';
import { useAppDispatch } from '../shared/hooks/reduxHooks';
import { fetchHolidaysAsync } from '../features/Calendar/asyncActions';
import TaskFilter from '../features/TaskManagement/TaskFilter';
import Calendar from "../features/Calendar/Calendar";
import {PageContainer} from "./styles/CalendarPage.styles";



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
