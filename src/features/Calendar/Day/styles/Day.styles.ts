import styled from 'styled-components';
import { media, theme } from '../../../../app/styles/theme';

export const DayContainer = styled.div<{ $isCurrentMonth: boolean }>`
    position: relative;
    border-radius: 5px;
    padding: 5px;
    background-color: ${(props) =>
            props.$isCurrentMonth ? '#e3e5e6' : '#ebebeb'};
    color: ${(props) => (props.$isCurrentMonth ? '#4c4e50' : '#969a9b')};
    display: flex;
    height: 150px;
    flex-direction: column;

    .day_number {
        font-size: ${theme.fontSizes.md};
        font-weight: bold;
        margin-bottom: 5px;
        .month_name {
         
        }
    }

    .holiday {
        font-size: 14px;
        color: ${theme.colors.holidayText};
        margin-bottom: 5px;
        font-weight: bold;
    }
    .active-task {
        margin: 5px 0;
        padding: 4px;
        font-size: 14px;
        font-weight: bold;
        color: #333;
        cursor: pointer;
        border: 1px solid #ddd;
        border-radius: 4px;
        background-color: #f5f5f5;

        &:hover {
            background-color: #e9ecef;
        }
    }

    .task {
        background-color: ${theme.colors.taskBackground};
        border: 1px solid ${theme.colors.border};
        padding: ${theme.spacing.xs};
        margin-top: ${theme.spacing.xs};
        cursor: grab;
        font-size: ${theme.fontSizes.xs};
    }

    @media ${media.xs} {
        .task {
            font-size: ${theme.fontSizes.md};
        }
    }

    @media ${media.md} {
        .task {
            font-size: ${theme.fontSizes.md};
        }
    }

    @media ${media.lg} {
        .task {
            font-size: ${theme.fontSizes.lg};
        }
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 100%;
`

export const AddTaskButton = styled.button`
    padding: 5px;
    border: none;
    border-radius: 50%;
    width: 22px;
    color: #ccc;
    cursor: pointer;
    font-size: 10px;

    &:hover {
        background-color: #545454;
    }
`;

export const TaskStripesContainer = styled.div`
    bottom: 8px;
    left: 8px;
    right: 8px;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;