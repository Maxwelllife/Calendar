import styled from 'styled-components';
import { theme, media } from '../../app/styles/theme';

const CalendarContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 5px;
    padding: ${theme.spacing.xs};
    background-color: ${theme.colors.background};

    @media ${media.xs} {
        grid-template-columns: repeat(2, 1fr);
        padding: ${theme.spacing.md};
    }

    @media ${media.md} {
        grid-template-columns: repeat(3, 1fr);
        padding: ${theme.spacing.lg};
    }

    @media ${media.lg} {
        grid-template-columns: repeat(5, 1fr);
    }
    @media ${media.xl} {
        grid-template-columns: repeat(7, 1fr);
    }
`;

export default CalendarContainer;
