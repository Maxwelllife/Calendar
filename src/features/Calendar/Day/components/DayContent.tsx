import React from "react";
import styled from "styled-components";
import TaskStripe from "../../../TaskManagement/TaskStripe";
import ActiveTask from "../../../TaskManagement/ActiveTask";
import {Task} from "../../../TaskManagement/taskSlice";


const ContentContainer = styled.div`
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 4px 4px 4px #dddddd;
    padding: 5px;
`;

const TaskStripesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

interface DayContentProps {
    tasks: Task[];
    activeTask: Task | undefined;
    setActiveTask: (id: string) => void;
    deleteTaskById: (id: string) => void;
    editTaskById: (id: string, text: string) => void;
}

const DayContent: React.FC<DayContentProps> = ({
                                                   tasks,
                                                   activeTask,
                                                   setActiveTask,
                                                   deleteTaskById,
                                                   editTaskById,
                                               }) => (
    <ContentContainer>
        <TaskStripesContainer>
            {tasks.map((task) => (
                <TaskStripe
                    key={task.id}
                    isActive={task.id === activeTask?.id}
                    onClick={() => setActiveTask(task.id)}
                />
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

export default DayContent;
