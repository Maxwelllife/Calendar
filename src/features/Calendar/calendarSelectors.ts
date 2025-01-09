import { createSelector } from 'reselect';
import { RootState } from '../../app/store';

export const makeSelectHolidaysByDate = () => {
    return createSelector(
        [(state: RootState) => state.calendar.holidays, (_, date: string) => date],
        (holidays, date) => holidays[date] || []
    );
};
