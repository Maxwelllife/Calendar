import styled from "styled-components";
import {theme} from "../../../app/styles/theme";

const Header = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-bottom: ${theme.spacing.md};

    .month-name {
        font-size: ${theme.fontSizes.lg};
        font-weight: bold;
    }

    button {
        background: none;
        border: none;
        font-size: ${theme.fontSizes.md};
        cursor: pointer;
        padding: ${theme.spacing.xs};
        color: ${theme.colors.holidayText};
    }

    button:hover {
        color: ${theme.colors.border};
    }
`;
export default Header;
