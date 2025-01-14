import React from 'react';
import Day from './Day/Day';
import { generateCalendarDays } from './utils';
import GridContainer from "./styles/GridContainer.styles";
import {Task} from "../TaskManagement/taskSlice";

interface CalendarGridProps {
    currentDate: Date;
    allTasks: Task[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, allTasks }) => {
    const days = generateCalendarDays(currentDate);

    return (
        <GridContainer>
            {days.map(({ date, dayNumber, isFirstDay, isLastDay, isCurrentMonth, monthName}) => {
                const tasksForDay = allTasks.filter((task) => task.day === date);
                return (
                    <Day
                        key={date}
                        date={date}
                        dayNumber={dayNumber}
                        isFirstDay={isFirstDay}
                        isLastDay={isLastDay}
                        isCurrentMonth={isCurrentMonth}
                        monthName={monthName}
                    />
                )
            })}
        </GridContainer>
    );
};

export default CalendarGrid;
