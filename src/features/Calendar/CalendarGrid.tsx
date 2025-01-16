import React from 'react';
import Day from './Day/Day';
import { generateCalendarDays } from './utils';
import GridContainer from "./styles/GridContainer.styles";

interface CalendarGridProps {
    currentDate: Date;
    today: Date;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, today}) => {
    const days = generateCalendarDays(currentDate);

    return (
        <GridContainer>
            {days.map(({ date, dayNumber, isFirstDay, isLastDay, isCurrentMonth, monthName}) => {
                return (
                    <Day
                        key={date}
                        date={date}
                        dayNumber={dayNumber}
                        isFirstDay={isFirstDay}
                        isLastDay={isLastDay}
                        isCurrentMonth={isCurrentMonth}
                        monthName={monthName}
                        today={today}
                    />
                )
            })}
        </GridContainer>
    );
};

export default CalendarGrid;
