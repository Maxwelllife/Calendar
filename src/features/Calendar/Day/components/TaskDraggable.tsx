import {Task} from "../../../TaskManagement/taskSlice";
import React, {CSSProperties} from "react";
import {useDraggable} from "@dnd-kit/core";
import TaskStripe from "../../../TaskManagement/TaskStripe";

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
export default TaskDraggable;