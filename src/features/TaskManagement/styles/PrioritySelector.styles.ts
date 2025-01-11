import styled from "styled-components";

export const PriorityContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    gap: 10px;
`;

export const PriorityOption = styled.div<{ color: string; selected: boolean }>`
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    .circle {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background-color: ${({ color }) => color};
        border: ${({ selected }) => (selected ? "1px solid black" : "none")};
        transform: ${({ selected }) => (selected ? "scale(1.1)" : "scale(1)")};
    }

    .label {
        font-size: 12px;
        color: ${({ selected }) => (selected ? "black" : "#888")};
    }
`;
