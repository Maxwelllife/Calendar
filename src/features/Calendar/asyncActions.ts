import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchHolidays } from '../../shared/api/holidaysAPI';

export const fetchHolidaysAsync = createAsyncThunk(
    'calendar/fetchHolidays',
    async (year: number) => await fetchHolidays(year.toString())
);
