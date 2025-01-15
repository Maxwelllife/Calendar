import React, {useEffect, useState} from 'react';
import {Task} from "./taskSlice";
import {FaTrashAlt} from "react-icons/fa";
import PrioritySelector from "./PrioritySelector";
import {ActiveTaskContainer} from "./styles/ActiveTask.styles";


interface ActiveTaskProps {
    task: Pick<Task, "id" | "text" | "priority">; // Вибираємо тільки потрібні поля
    onDeleteTask: (id: string) => void;
    onEditTask: (id: string, text?: string, priority?: "high" | "medium" | "low") => void;
}

const ActiveTask: React.FC<ActiveTaskProps> = ({task, onDeleteTask, onEditTask}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);
    const [isPrioritySelectorActive, setPrioritySelectorActive] = useState(false); // Флаг для визначення активності вибору пріоритету

    // Оновлюємо текст, коли змінюється активна таска
    useEffect(() => {
        setEditedText(task.text);
    }, [task]);
    const handleSaveEdit = () => {
        if (editedText !== task.text) {
            onEditTask(task.id, editedText); // Зберігаємо текст
        }
        setIsEditing(false); // Закриваємо редагування
    };
    const handlePriorityChange = (priority?: "high" | "medium" | "low") => {
        handleSaveEdit(); // Зберігаємо текст перед вибором кольору
        onEditTask(task.id, undefined, priority); // Редагуємо тільки пріоритет
        setPrioritySelectorActive(false); // Скидаємо флаг
        setIsEditing(false); // Завершуємо редагування після вибору кольору
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
                        }} // Закриваємо редагування, якщо вибір кольору неактивний
                        autoFocus
                    />

                    <PrioritySelector
                        currentPriority={task.priority}
                        onChange={handlePriorityChange}
                        onMouseDown={() => setPrioritySelectorActive(true)} // Активуємо вибір пріоритету
                        onMouseUp={() => setPrioritySelectorActive(false)} // Деактивуємо після завершення вибору
                    />
                </div>

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