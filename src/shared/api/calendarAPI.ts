import axios from 'axios';

const BASE_URL = 'https://date.nager.at/api/v3';

export interface Country {
    countryCode: string;
    name: string;
}

export interface Holiday {
    date: string;
    localName: string;
    name: string;
    countryCode: string;
}

export const getCountries = async (): Promise<Country[]> => {
    const response = await axios.get(`${BASE_URL}/AvailableCountries`);
    return response.data;
};

export const getHolidaysByCountry = async (countryCode: string, year: number): Promise<Holiday[]> => {
    const response = await axios.get(`${BASE_URL}/PublicHolidays/${year}/${countryCode}`);
    return response.data;
};
