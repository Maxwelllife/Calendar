import {createSlice} from "@reduxjs/toolkit";
import {fetchHolidaysAsync} from "./asyncActions";

interface Holiday {
    name: string;
    date: string;
}

interface CalendarState {
    holidays: Record<string, Holiday[]>; // Ключ - дата у форматі 'YYYY-MM-DD', значення - масив свят
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CalendarState = {
    holidays: {},
    status: 'idle',
};


const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHolidaysAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchHolidaysAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';

                // Створюємо новий об'єкт для holidays
                const updatedHolidays = {...state.holidays};

                action.payload.forEach((holiday: Holiday) => {
                    const formattedDate = holiday.date;

                    // Ініціалізуємо новий масив для дати
                    if (!updatedHolidays[formattedDate]) {
                        updatedHolidays[formattedDate] = [];
                    }

                    // Додаємо свято, якщо його ще немає
                    if (!updatedHolidays[formattedDate].some((existingHoliday) => existingHoliday.name === holiday.name)) {
                        updatedHolidays[formattedDate] = [...updatedHolidays[formattedDate], holiday];
                    }
                });

                // Заміна старого об'єкта на новий
                state.holidays = updatedHolidays;
            })

            .addCase(fetchHolidaysAsync.rejected, (state) => {
                state.status = 'failed';
            });
    },
});
export default calendarSlice.reducer;