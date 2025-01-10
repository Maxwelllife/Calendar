import {DayContainer, AddTaskButton, ButtonContainer} from "./styles/Day.styles";
import React, {useState} from "react";
import {makeSelectHolidaysByDate} from "../calendarSelectors";
import {useAppDispatch, useAppSelector} from "../../../shared/hooks/reduxHooks";
import {addTask} from "../../TaskManagement/taskSlice";
import {FaPlus} from "react-icons/fa";
import {makeSelectTasksByDate} from "../../TaskManagement/taskSelectors";
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
}


const Day: React.FC<DayProps> = ({ date, dayNumber, isCurrentMonth, monthName }) => {
    const dispatch = useAppDispatch();
    const formattedDate = new Date(date).toISOString().split("T")[0];

    const selectTasksByDate = React.useMemo(() => makeSelectTasksByDate(), []);
    const selectHolidaysByDate = React.useMemo(makeSelectHolidaysByDate, []);

    const tasks = useAppSelector((state) => selectTasksByDate(state, date));
    const holidays = useAppSelector((state) => selectHolidaysByDate(state, formattedDate));

    const [activeTaskId, setActiveTaskId] = useState<string | null>(
        tasks.length > 0 ? tasks[0].id : null
    );
    const { deleteTaskById, editTaskById } = useTaskActions(tasks, setActiveTaskId);

    const activeTask = tasks.find((task) => task.id === activeTaskId);

    const handleCreateTask = () => {
        const newTask = {
            id: uuidv4(),
            day: formattedDate,
            text: "New Task",
            order: tasks.length + 1,
        };
        dispatch(addTask(newTask));
        setActiveTaskId(newTask.id);
    };

    return (
        <DayContainer $isCurrentMonth={isCurrentMonth}>
            <DayHeader monthName={monthName} dayNumber={dayNumber} taskCount={tasks.length} />
            {holidays.map((holiday, index) => (
                <div key={index} className="holiday">
                    {holiday.name}
                </div>
            ))}
            {tasks.length > 0 && (
                <DayContent
                    tasks={tasks}
                    activeTask={activeTask}
                    setActiveTask={setActiveTaskId}
                    deleteTaskById={deleteTaskById}
                    editTaskById={editTaskById}
                />
            )}
            <ButtonContainer>
                <AddTaskButton onClick={handleCreateTask}>
                    <FaPlus />
                </AddTaskButton>
            </ButtonContainer>
        </DayContainer>
    );
};

export default Day;