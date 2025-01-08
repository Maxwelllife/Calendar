export const fetchHolidays = async (year: string): Promise<any> => {
    try {
        const response = await fetch(`https://date.nager.at/Api/v3/PublicHolidays/${year}/US`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching holidays:', error);
        throw error;
    }
};
