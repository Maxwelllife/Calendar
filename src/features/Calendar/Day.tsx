import DayContainer from "./styles/Day.styles";
import React from "react";
import {makeSelectHolidaysByDate} from "./calendarSelectors";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/reduxHooks";
import TaskList from "../TaskManagement/TaskList";
import {addTask, deleteTask} from "../TaskManagement/taskSlice";
import styled from "styled-components";
import {FaPlus} from "react-icons/fa";

const ButtonContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 100%;
`

const AddTaskButton = styled.button`
    padding: 5px;
    border: none;
    border-radius: 50%;
    width: 22px;
    color: #ccc;
    cursor: pointer;
    font-size: 10px;

    &:hover {
        background-color: #545454;
    }
`;

interface DayProps {
    date: string; // Формат YYYY-MM-DD
    dayNumber: number; // Номер дня
    isFirstDay: boolean;
    isLastDay: boolean;
    isCurrentMonth: boolean;
    monthName?: string;
}

const Day: React.FC<DayProps> = ({date, dayNumber, isFirstDay, isLastDay, isCurrentMonth, monthName}) => {
    const dispatch = useAppDispatch();

    const formattedDate = new Date(date).toISOString().split('T')[0];

    // Мемоїзація селектора для свят (видаляємо пакет reselect, якщо більше ніде не буде використовуватись цей select)
    const selectHolidaysByDate = React.useMemo(makeSelectHolidaysByDate, []);
    // Отримуємо свята для конкретної дати
    const holidays = useAppSelector((state) => selectHolidaysByDate(state, formattedDate));


    const handleCreateTask = () => {
        dispatch(addTask({ day: formattedDate, text: "New Task" })); // Передаємо нове завдання в Redux
    };
    return (
        <DayContainer $isCurrentMonth={isCurrentMonth}>
            <div className="day_number">
                {monthName && <span className="month_name">{monthName} </span>}
                {dayNumber}
            </div>
            {holidays.map((holiday, index) => (
                <div key={index} className="holiday">
                    {holiday.name}
                </div>
            ))}
            <TaskList date={formattedDate} />
            <ButtonContainer>
                <AddTaskButton onClick={() => handleCreateTask()}>
                    <FaPlus />
                </AddTaskButton>
            </ButtonContainer>
        </DayContainer>
    );
};

export default Day;