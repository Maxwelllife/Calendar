import React from 'react';
import TaskFilter from "../TaskManagement/TaskFilter";
import CountrySelector from "../Calendar/CountrySelector/CountrySelector";
import {HeaderContainer} from "./Header.styles";


const Header: React.FC = () => {

    return (
        <HeaderContainer >
            <TaskFilter/>
            <h1>Task calendar</h1>
            <CountrySelector/>
        </HeaderContainer>
    );
};

export default Header;
