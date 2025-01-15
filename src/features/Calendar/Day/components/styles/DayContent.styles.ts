import styled from "styled-components";

export const ContentContainer = styled.div<{$isEmptyTaskList: boolean}>`
    ${({ $isEmptyTaskList }) =>
            $isEmptyTaskList
                    ? `
                    font-size: 13px;
                background-color: none;
                border-radius: 0;
                box-shadow: none;
                padding: 0;
            `
                    : `
                background-color: #f9f9f9;
                border-radius: 5px;
                box-shadow: 4px 4px 4px #dddddd;
                padding: 5px;
            `
    }
`;

export const TaskStripesContainer = styled.div<{$isEmptyTaskList: boolean}>`
    display: flex;
    justify-content: ${({$isEmptyTaskList}) => ( $isEmptyTaskList ? 'center' : 'flex-start')};
    flex-wrap: wrap;
    gap: 5px;
    position: relative;
    z-index: 1;
`;
