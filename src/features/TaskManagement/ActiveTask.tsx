import React, {useState} from 'react';
import styled from 'styled-components';
import {Task} from "./taskSlice";
import {FaTrashAlt} from "react-icons/fa";

const ActiveTaskContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: #f9f9f9;

    textarea {
        width: 100%;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 5px;
        outline: none;
        resize: none;
    }

    .delete {
        padding: 0;
        border: none;
        background: none;
        color: #dc3545;
        cursor: pointer;
        font-size: 12px;

        &:hover {
            color: #b02a37;
        }
    }

`;

interface ActiveTaskProps {
    task: Pick<Task, "id" | "text">; // Вибираємо тільки потрібні поля
    onDeleteTask: (id: string) => void;
    onEditTask: (id: string, text: string) => void;
}

const ActiveTask: React.FC<ActiveTaskProps> = ({task, onDeleteTask, onEditTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);

    const handleSaveEdit = () => {
        onEditTask(task.id, editedText);
        setIsEditing(false);
    };

    return (
        <ActiveTaskContainer>
            {isEditing ? (
                <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={handleSaveEdit}
                    autoFocus
                />
            ) : (
                <div className="task-text" onClick={() => setIsEditing(true)}>
                    {task.text}
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