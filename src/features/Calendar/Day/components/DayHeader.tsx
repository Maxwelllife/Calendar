import React from "react";
import {DayNumber, HeaderContainer, MonthName, TaskCount} from './styles/Header.styles';


interface DayHeaderProps {
    monthName?: string;
    dayNumber: number;
    taskCount: number;
}

const DayHeader: React.FC<DayHeaderProps> = ({ monthName, dayNumber, taskCount }) => (
    <HeaderContainer>
        {monthName && <MonthName>{monthName} </MonthName>}
        <DayNumber>{dayNumber}</DayNumber>
        {taskCount > 0 && (
            <TaskCount>
                {taskCount} {taskCount === 1 ? "card" : "cards"}
            </TaskCount>
        )}
    </HeaderContainer>
);

export default DayHeader;
