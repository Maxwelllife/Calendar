import styled from 'styled-components';
import { media, theme } from '../../../app/styles/theme';

const DayContainer = styled.div<{ $isCurrentMonth: boolean }>`
    border-radius: 5px;
    padding: 5px;
    background-color: ${(props) =>
            props.$isCurrentMonth ? '#e3e5e6' : '#ebebeb'};
    color: ${(props) => (props.$isCurrentMonth ? '#4c4e50' : '#969a9b')};
    display: flex;
    height: 150px;
    flex-direction: column;
    //align-items: center;

    .day_number {
        font-size: ${theme.fontSizes.xs};
        font-weight: bold;
        margin-bottom: ${theme.spacing.xs};
        .month_name {
         
        }
    }

    .holiday {
        font-size: ${theme.fontSizes.xs};
        color: ${theme.colors.holidayText};
        margin-bottom: ${theme.spacing.xs};
        font-weight: bold;
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
        .holiday {
            font-size: ${theme.fontSizes.md};
        }

        .task {
            font-size: ${theme.fontSizes.md};
        }
    }

    @media ${media.md} {
        .holiday {
            font-size: ${theme.fontSizes.lg};
        }

        .task {
            font-size: ${theme.fontSizes.md};
        }
    }

    @media ${media.lg} {
        font-size: ${theme.fontSizes.lg};

        .holiday {
            font-size: ${theme.fontSizes.lg};
        }

        .task {
            font-size: ${theme.fontSizes.lg};
        }
    }
`;

export default DayContainer;
