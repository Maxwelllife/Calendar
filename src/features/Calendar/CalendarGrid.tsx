import React from 'react';
import Day from './Day/Day';
import { generateCalendarDays } from './utils';
import GridContainer from "./styles/GridContainer.styles";

interface CalendarGridProps {
    currentDate: Date;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate }) => {
    const days = generateCalendarDays(currentDate);

    return (
        <GridContainer>
            {days.map(({ date, dayNumber, isFirstDay, isLastDay, isCurrentMonth, monthName}) => (
                <Day
                    key={date}
                    date={date}
                    dayNumber={dayNumber}
                    isFirstDay={isFirstDay}
                    isLastDay={isLastDay}
                    isCurrentMonth={isCurrentMonth}
                    monthName={monthName}
                />
            ))}
        </GridContainer>
    );
};

export default CalendarGrid;
