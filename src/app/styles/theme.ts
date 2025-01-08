export const theme = {
    colors: {
        border: '#ddd',
        background: '#f9f9f9',
        taskBackground: '#fff',
        holidayText: '#007bff',
    },
    spacing: {
        xs: '10px',
        md: '15px',
        lg: '20px',
    },
    fontSizes: {
        xs: '14px',
        md: '16px',
        lg: '18px',
    },
    breakpoints: {
        xs: '576px',
        md: '768px',
        lg: '991px',
        xl: '1200px',
    },
};
export const media = {
    xs: `(min-width: ${theme.breakpoints.xs})`,
    md: `(min-width: ${theme.breakpoints.md})`,
    lg: `(min-width: ${theme.breakpoints.lg})`,
    xl: `(min-width: ${theme.breakpoints.xl})`,
};
