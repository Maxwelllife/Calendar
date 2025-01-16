import { createSelector } from 'reselect';
import { RootState } from '../../app/store';

export const makeSelectHolidaysByDate = () => {
    return createSelector(
        [
            (state: RootState) => state.calendar.holidays,
            (_: RootState, date: string) => date,
            (state: RootState) => state.calendar.selectedCountry
        ],
        (holidays, date, selectedCountry) => {
            if (!holidays[selectedCountry]) return []

            const holidaysForDate = holidays[selectedCountry].filter(
                (holiday) => holiday.date === date
            );

            return holidaysForDate;
        }
    );
};
