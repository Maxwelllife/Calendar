import React, { useState } from 'react';
import CalendarGrid from './CalendarGrid';
import Header from "./styles/Header.styles";
import WeekDays from "./styles/WeekDays.styles";

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Отримуємо назву місяця і року
    const currentMonthName = currentDate.toLocaleString('en-US', { month: 'long' });
    const currentYear = currentDate.getFullYear();

    // Перемикання місяців
    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
        <>
            <Header>
                <button onClick={handlePreviousMonth}>&lt;</button>
                <span className="month-name">{`${currentMonthName} ${currentYear}`}</span>
                <button onClick={handleNextMonth}>&gt;</button>
            </Header>
            <WeekDays>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <span key={day}>{day}</span>
                ))}
            </WeekDays>
            <CalendarGrid currentDate={currentDate} />
        </>
    );
};

export default Calendar;
