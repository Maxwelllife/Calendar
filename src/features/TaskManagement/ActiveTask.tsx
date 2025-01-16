import React, {useEffect, useState} from 'react';
import {Task} from "./taskSlice";
import {FaTrashAlt} from "react-icons/fa";
import PrioritySelector from "./PrioritySelector";
import {ActiveTaskContainer} from "./styles/ActiveTask.styles";
import {toast} from "react-toastify";


interface ActiveTaskProps {
    task: Pick<Task, "id" | "text" | "priority">; // Pick вибираємо тільки потрібні поля
    onDeleteTask: (id: string) => void;
    onEditTask: (id: string, text?: string, priority?: "high" | "medium" | "low") => void;
}

const ActiveTask: React.FC<ActiveTaskProps> = ({task, onDeleteTask, onEditTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState<string>(task.text || "");
    const [isPrioritySelectorActive, setPrioritySelectorActive] = useState(false);

    useEffect(() => {
        setEditedText(task.text || "");
    }, [task]);
    const handleSaveEdit = () => {
        if (!editedText.trim()) {
            toast.error("Текст завдання не може бути порожнім.");
            return;
        }
        if (editedText !== task.text) {
            onEditTask(task.id, editedText.trim());
        }
        setIsEditing(false);
    };
    const handlePriorityChange = (priority?: "high" | "medium" | "low") => {
        handleSaveEdit();
        onEditTask(task.id, undefined, priority);
        setPrioritySelectorActive(false);
        setIsEditing(false);
    };

    return (
        <ActiveTaskContainer>
            {isEditing ? (
                <div className="edit_text_wrapper">
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onBlur={() => {
                            if (!isPrioritySelectorActive) {
                                handleSaveEdit();
                            }
                        }}
                        autoFocus
                    />

                    <PrioritySelector
                        currentPriority={task.priority}
                        onChange={handlePriorityChange}
                        onMouseDown={() => setPrioritySelectorActive(true)}
                        onMouseUp={() => setPrioritySelectorActive(false)}
                    />
                </div>

            ) : (
                <div className="task-text" onClick={() => setIsEditing(true)}>
                    {task.text || "Click to edit"}
                </div>
            )}

            {!isEditing && (
                <button
                    className="delete"
                    onClick={() => onDeleteTask(task.id)}
                >
                    <FaTrashAlt/>
                </button>
            )}
        </ActiveTaskContainer>
    );
};


export default ActiveTask;