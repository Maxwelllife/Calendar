import styled from "styled-components";

export const ActiveTaskContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 8px;
    background-color: #f9f9f9;

    .edit_text_wrapper {
        display: flex;
        flex-direction: column;
    }
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