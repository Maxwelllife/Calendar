import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../shared/hooks/reduxHooks';
import Calendar from "../features/Calendar/Calendar";
import {PageContainer} from "./styles/CalendarPage.styles";
import {fetchHolidays} from "../features/Calendar/calendarSlice";
import Header from "../features/Header/Header";


const CalendarPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {selectedCountry, year} = useAppSelector((state) => state.calendar);

    useEffect(() => {
        dispatch(fetchHolidays({countryCode: selectedCountry, year}));
    }, [dispatch, selectedCountry, year]);


    return (
        <PageContainer>
            <Header/>
            <Calendar/> {/* Передаємо свята до Calendar */}
        </PageContainer>
    );
};

export default CalendarPage;
