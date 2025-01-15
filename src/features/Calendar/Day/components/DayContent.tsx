import React from "react";
import TaskStripe from "../../../TaskManagement/TaskStripe";
import ActiveTask from "../../../TaskManagement/ActiveTask";
import { Task } from "../../../TaskManagement/taskSlice";
import {useDraggable, useDroppable} from "@dnd-kit/core";
import DroppableWrapper from "./DroppableWrapper";
import {ContentContainer, TaskStripesContainer} from "./styles/DayContent.styles";
import { CSSProperties } from "react";


interface DayContentProps {
    tasks: Task[];
    activeTask: Task | undefined;
    setActiveTask: (id: string) => void;
    deleteTaskById: (id: string) => void;
    editTaskById: (id: string, text?: string, priority?: "high" | "medium" | "low") => void;
    date: string; // Дата дня, використовується як id для droppable
}

const DayContent: React.FC<DayContentProps> = ({
                                                   tasks,
                                                   activeTask,
                                                   setActiveTask,
                                                   deleteTaskById,
                                                   editTaskById,
                                                   date,
                                               }) => {
    // Droppable для дня
    const { setNodeRef: setDayNodeRef } = useDroppable({
        id: date, // ID дня
        data: {
            date, // Передаємо інформацію про день
        },
    });

    return (
        <ContentContainer >
            <TaskStripesContainer ref={setDayNodeRef}>
                {tasks.map((task) => (
                    <DroppableWrapper
                        key={task.id}
                        id={task.id} // ID завдання
                        data={{
                            date: task.day, // День завдання
                            taskId: task.id, // ID завдання
                        }}
                    >
                        <TaskDraggable
                            task={task}
                            isActive={task.id === activeTask?.id}
                            setActiveTask={(id) => {setActiveTask(id);}}
                        />
                    </DroppableWrapper>
                ))}
            </TaskStripesContainer>
            {activeTask && (
                <ActiveTask
                    task={activeTask}
                    onDeleteTask={deleteTaskById}
                    onEditTask={editTaskById}
                />
            )}
        </ContentContainer>
    );
};

interface TaskDraggableProps {
    task: Task;
    isActive: boolean;
    setActiveTask: (id: string) => void;
}

const TaskDraggable: React.FC<TaskDraggableProps> = ({ task, isActive, setActiveTask }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id, // Унікальний id для кожної таски
        data: {
            taskId: task.id, // Передаємо ID таски
            day: task.day, // Передаємо день таски
        },
    });
    const style: CSSProperties = {
        transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    };
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            <TaskStripe
                isActive={isActive}
                priority={task.priority}
                onPointerUp={() => setActiveTask(task.id)}
            />
        </div>
    );
};

export default DayContent;
