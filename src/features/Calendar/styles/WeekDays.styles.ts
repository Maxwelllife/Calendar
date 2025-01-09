import {theme} from "../../../app/styles/theme";
import styled from "styled-components";

const WeekDays = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    width: 100%;
    text-align: center;
    margin-bottom: ${theme.spacing.md};
    font-weight: bold;
  

    span {  
        min-width: 75px;
        color: #969a9b;
        font-size: ${theme.fontSizes.md};
    }
`;

export default WeekDays;