import React from "react";
import ActiveTask from "../../../TaskManagement/ActiveTask";
import { Task } from "../../../TaskManagement/taskSlice";
import {useDroppable} from "@dnd-kit/core";
import DroppableWrapper from "./DroppableWrapper";
import {ContentContainer, TaskStripesContainer} from "./styles/DayContent.styles";
import TaskDraggable from "./TaskDraggable";


interface DayContentProps {
    tasks: Task[];
    activeTask: Task | undefined;
    setActiveTask: (id: string) => void;
    deleteTaskById: (id: string) => void;
    editTaskById: (id: string, text?: string, priority?: "high" | "medium" | "low") => void;
    date: string;
    isPast: boolean;
}

const DayContent: React.FC<DayContentProps> = ({
                                                   tasks,
                                                   activeTask,
                                                   setActiveTask,
                                                   deleteTaskById,
                                                   editTaskById,
                                                   date,
                                                   isPast,
                                               }) => {
    // Droppable для дня
    const { setNodeRef: setDayNodeRef } = useDroppable({
        id: date,
        data: {
            date,
        },
    });

    const isEmptyTaskList = tasks.length === 0

    return (
        <ContentContainer $isEmptyTaskList={isEmptyTaskList}>
            <TaskStripesContainer ref={setDayNodeRef} $isEmptyTaskList={isEmptyTaskList}>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <DroppableWrapper
                            key={task.id}
                            id={task.id}
                            data={{
                                date: task.day,
                                taskId: task.id,
                            }}
                        >
                            <TaskDraggable
                                task={task}
                                isActive={task.id === activeTask?.id}
                                setActiveTask={setActiveTask}
                            />
                        </DroppableWrapper>
                    ))
                ) : (  !isPast && (
                    <DroppableWrapper
                        id={`${date}-empty`}
                        data={{
                            date: date,
                            taskId: null,
                        }}
                    >
                        <div >Drop here</div>
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

export default DayContent;
