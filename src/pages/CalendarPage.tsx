import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../shared/hooks/reduxHooks';
import { fetchHolidaysAsync } from '../features/Calendar/asyncActions';
import Day from '../entities/Day/Day';
import TaskFilter from '../features/TaskManagement/TaskFilter';
import CalendarContainer from "../features/Calendar/CalendarContainer";


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

    const generateCalendarDays = () => {
        const currentMonth = new Date().getMonth();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const days = [];

        for (let day = 1; day <= daysInMonth; day++) {
            const date = `${currentYear}-${currentMonth + 1}-${day}`;
            const isFirstDay = day === 1;
            const isLastDay = day === daysInMonth;

            days.push(<Day key={date} date={date} dayNumber={day} isFirstDay={isFirstDay} isLastDay={isLastDay} />);
        }
        return days;
    };

    return (
        <PageContainer>
            <h1>Task Calendar</h1>
            <TaskFilter />
            <CalendarContainer>{generateCalendarDays()}</CalendarContainer>
        </PageContainer>
    );
};

export default CalendarPage;
