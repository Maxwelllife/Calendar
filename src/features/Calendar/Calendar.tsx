import React, {useState} from 'react';
import CalendarGrid from './CalendarGrid';
import Header from "./styles/Header.styles";
import WeekDays from "./styles/WeekDays.styles";
import {DndContext, closestCenter} from "@dnd-kit/core";
import {arrayMove} from "@dnd-kit/sortable";
import {useAppDispatch, useAppSelector} from "../../shared/hooks/reduxHooks";
import {editTask, reorderTask} from "../TaskManagement/taskSlice";
import { toast } from "react-toastify";

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const dispatch = useAppDispatch();
    const allTasks = useAppSelector((state) => state.tasks.tasks);


    const currentMonthName = currentDate.toLocaleString('en-US', {month: 'long'});
    const currentYear = currentDate.getFullYear();
    const today = new Date();

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over) return; // Якщо елемент не скинуто в жодну область

        const activeTaskId = active.data.current?.taskId;
        const activeTaskDay = active.data.current?.day;

        const overDay = over.data.current?.date || over.id;
        const overTaskId = over.data.current?.taskId;

        if (!activeTaskId || !activeTaskDay || !overDay) return;

        if (new Date(overDay) < today) {
            toast.error("Перетягування на минулі дні заборонено.")
            return;
        }
        // Перетягування в межах одного дня
        if (activeTaskDay === overDay) {

            const tasksForDay = allTasks.filter((task) => task.day === activeTaskDay);

            const oldIndex = tasksForDay.findIndex((task) => task.id === activeTaskId);

            // Якщо overTaskId є null, це означає, що завдання перетягнули в кінець
            const newIndex = overTaskId
                ? tasksForDay.findIndex((task) => task.id === overTaskId)
                : tasksForDay.length;

            if (oldIndex !== newIndex && newIndex !== -1) {
                const reorderedTasks = arrayMove(tasksForDay, oldIndex, newIndex);

                reorderedTasks.forEach((task, index) => {
                    dispatch(reorderTask({ id: task.id, order: index + 1 }));
                });
            }
        } else {
            // Перетягування між різними днями
            if (overDay && activeTaskDay && activeTaskDay !== overDay) {
                dispatch(editTask({ id: activeTaskId, day: overDay }));
            }

        }
    };


    return (
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
            <CalendarGrid currentDate={currentDate} today={today}/>
        </DndContext>
    );
};

export default Calendar;
