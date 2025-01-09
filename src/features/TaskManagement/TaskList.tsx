import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../shared/hooks/reduxHooks';
import {makeSelectTasksByDate} from './taskSelectors';
import {deleteTask, editTask} from './taskSlice';
import styled from 'styled-components';
import {FaTrashAlt} from 'react-icons/fa';

const TaskContainer = styled.div`
    margin-bottom: 10px;
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .task-text {
        flex-grow: 1;
        font-size: 13px;
        margin-right: 4px;
        cursor: pointer;
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

    textarea {
        width: auto;
        max-width: 226px;
        box-sizing: border-box;
        margin-right: 4px;
        border: 1px solid #ddd;
        border-radius: 5px;
        padding: 5px;
        outline: none; 
        resize: none;
    }
`;


interface TaskListProps {
    date: string;
}


const TaskList: React.FC<TaskListProps> = ({date}) => {
    const dispatch = useAppDispatch();
    // Мемоїзація селектора для завдань
    const selectTasksByDate = React.useMemo(makeSelectTasksByDate, []);
    const tasks = useAppSelector((state) => selectTasksByDate(state, date));


    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editedText, setEditedText] = useState<string>('');

    const handleTextClick = (id: string, currentText: string) => {
        setEditingTaskId(id);
        setEditedText(currentText);
    };

    const handleSaveEdit = (id: string) => {
        dispatch(editTask({id, text: editedText}));
        setEditingTaskId(null);
    };

    const handleDeleteClick = (id: string) => {
        dispatch(deleteTask(id));
    };

    return (
        <>
            {tasks.map((task) => (
                <TaskContainer key={task.id}>
                    {editingTaskId === task.id ? (
                        <textarea
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            onBlur={() => handleSaveEdit(task.id)}
                            autoFocus
                        />
                    ) : (
                        <span
                            className="task-text"
                            onClick={() => handleTextClick(task.id, task.text)}
                        >
                            {task.text}
                        </span>
                    )}
                    <button
                        className="delete"
                        onClick={() => handleDeleteClick(task.id)}
                    >
                        <FaTrashAlt/>
                    </button>
                </TaskContainer>
            ))}
        </>
    );
};

export default TaskList;
