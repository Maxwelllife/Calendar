import React from 'react';
import { useAppSelector } from '../../shared/hooks/reduxHooks';
import { selectFilteredTasks } from '../../features/TaskManagement/taskSelectors';
import { makeSelectHolidaysByDate } from '../../features/Calendar/calendarSelectors';
import DayContainer from './DayContainer';

interface DayProps {
    date: string; // Формат YYYY-MM-DD
    dayNumber: number;
    isFirstDay: boolean;
    isLastDay: boolean
}

const Day: React.FC<DayProps> = ({ date, dayNumber, isFirstDay, isLastDay }) => {

    const formattedDate = new Date(date).toISOString().split('T')[0];
    // TODO: якщо makeSelectHolidaysByDate використовуються лише в одному компоненті, reselect треба буде видалити
    const selectHolidaysByDate = React.useMemo(makeSelectHolidaysByDate, []);

    // Отримуємо фільтровані задачі
    const filteredTasks = useAppSelector(selectFilteredTasks);
    // Отримуємо свята для конкретної дати
    const holidays = useAppSelector((state) => selectHolidaysByDate(state, formattedDate));
    // Фільтруємо задачі для конкретного дня
    const tasksForDay = filteredTasks.filter((task) => task.day === formattedDate);


    // Визначаємо назву місяця
    const monthShortName = new Date(date).toLocaleString('en-US', { month: 'short' });

    return (
        <DayContainer>
            <div className="day_number">
                {(isFirstDay || isLastDay) && <span className="month_name"> {monthShortName} </span>}
                {dayNumber}
            </div>
            {holidays.map((holiday, index) => (
                <div key={index}>
                    {holiday.name}
                </div>
            ))}
            {tasksForDay.map((task) => (
                <div key={task.id} draggable>
                    {task.text}
                </div>
            ))}
        </DayContainer>
    );
};

export default Day;
