import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {Country, Holiday, getCountries, getHolidaysByCountry} from "../../shared/api/calendarAPI";



interface CalendarState {
    holidays: Record<string, Holiday[]>; // Наприклад, { "US": [ {name: "...", date: "..."} ] }
    countryCode: string;
    year: number;
    selectedCountry: string;
    countries: Country[];
    loading: boolean;
    error: string | null;
}

const initialState: CalendarState = {
    holidays: {},
    countryCode: 'US',
    year: new Date().getFullYear(),
    selectedCountry: 'UA',
    countries: [],
    loading: false,
    error: null,
};

interface FetchHolidaysArg {
    countryCode: string;
    year: number;
}

export const fetchCountries = createAsyncThunk('calendar/fetchCountries', async () => {
    return await getCountries();
});

export const fetchHolidays = createAsyncThunk<
        Holiday[], // Тип повернутого значення
        FetchHolidaysArg // Тип аргументів
    >(
    'calendar/fetchHolidays',
    async ({countryCode, year}: { countryCode: string; year: number }) => {
        return await getHolidaysByCountry(countryCode, year);
    }
);

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        setSelectedCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountry = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch countries';
            })
            .addCase(fetchHolidays.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHolidays.fulfilled, (state, action) => {
                state.loading = false;

                const { countryCode } = action.meta.arg;
                state.holidays[countryCode] = action.payload; // Використовуємо action.payload для отримання свят
            })
            .addCase(fetchHolidays.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch holidays';
            });
    },
});

export const {setSelectedCountry} = calendarSlice.actions;
export default calendarSlice.reducer;
