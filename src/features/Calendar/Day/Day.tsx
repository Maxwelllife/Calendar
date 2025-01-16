import {DayContainer, AddTaskButton, ButtonContainer} from "./styles/Day.styles";
import React, {useEffect, useState} from "react";
import {makeSelectHolidaysByDate} from "../calendarSelectors";
import {useAppSelector} from "../../../shared/hooks/reduxHooks";
import {FaPlus} from "react-icons/fa";
import {selectFilteredTasks} from "../../TaskManagement/taskSelectors";
import DayHeader from "./components/DayHeader";
import DayContent from "./components/DayContent";
import {v4 as uuidv4} from 'uuid';
import {useTaskActions} from "../../TaskManagement/useTaskActions";


interface DayProps {
    date: string; // Формат YYYY-MM-DD
    dayNumber: number;
    isFirstDay: boolean;
    isLastDay: boolean;
    isCurrentMonth: boolean;
    monthName?: string;
    today: Date;
}


const Day: React.FC<DayProps> = ({date, dayNumber, isCurrentMonth, monthName, today}) => {

    const selectHolidaysByDate = React.useMemo(makeSelectHolidaysByDate, []);
    const formattedDate = new Date(date).toISOString().split("T")[0];

    const holidays = useAppSelector((state) => selectHolidaysByDate(state, formattedDate));
    const allFilteredTasks = useAppSelector(selectFilteredTasks); // Отримуємо фільтровані по пошуку таски
    // Фільтруємо таски для конкретного дня
    const tasks = allFilteredTasks.filter((task) => task.day === date);

    const [activeTaskId, setActiveTaskId] = useState<string | null>(
        tasks.length > 0 ? tasks[0].id : null
    );

    useEffect(() => {
        if (!tasks.some((task) => task.id === activeTaskId)) {
            setActiveTaskId(tasks.length > 0 ? tasks[0].id : null); // Першу задачу активною
        }
    }, [tasks, activeTaskId]);

    const handleSetActiveTaskId = React.useCallback((id: string) => {
        setActiveTaskId(id);
    }, []);

    const {addNewTask, editTaskById, deleteTaskById} = useTaskActions(tasks, setActiveTaskId);

    const activeTask = tasks.find((task) => task.id === activeTaskId);

    const handleCreateTask = () => {
        const newTask = {
            id: uuidv4(),
            day: formattedDate,
            text: "Click to edit",
            order: tasks.length + 1,
            priority: undefined, // Якщо не обов'язково, можна пропустити
        };
        addNewTask(newTask);
    };
    today.setHours(0, 0, 0, 0);
    const isPast = new Date(date) < today; // Дні в минулому
    const isToday = new Date(date).toDateString() === today.toDateString(); // Саме поточний день для стилів

    return (
        <DayContainer $isCurrentMonth={isCurrentMonth} $isToday={isToday} $isPast={isPast}>
            <DayHeader monthName={monthName} dayNumber={dayNumber} taskCount={tasks.length}/>
            {holidays.map((holiday, index) => (
                <div key={index} className="holiday">
                    {holiday.name}
                </div>
            ))}
            <DayContent
                tasks={tasks}
                activeTask={activeTask}
                setActiveTask={handleSetActiveTaskId}
                deleteTaskById={deleteTaskById}
                editTaskById={editTaskById}
                date={date}
                isPast={isPast}
            />

            <ButtonContainer>
                {!isPast && (
                    <AddTaskButton onClick={handleCreateTask}>
                        <FaPlus/>
                    </AddTaskButton>)
                }

            </ButtonContainer>
        </DayContainer>
    );
};

export default Day;