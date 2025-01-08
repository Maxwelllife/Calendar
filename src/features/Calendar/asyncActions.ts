import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHolidays } from '../../shared/api/holidaysAPI';

export const fetchHolidaysAsync = createAsyncThunk(
    'calendar/fetchHolidays',
    async (year: number) => {
        const response = await fetchHolidays(year.toString());
        console.log('response', response);
        return response;
    }
);
