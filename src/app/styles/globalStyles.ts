import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Roboto';
        src: url('/assets/fonts/Roboto-Regular.woff2') format('woff2'),
        font-display: swap;
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Roboto';
        src: url('/assets/fonts/Roboto-Bold.woff2') format('woff2'),
        font-display: swap;
        font-weight: 700;
        font-style: normal;
    }

    body {
        margin: 0;
        font-family: Roboto, sans-serif;
        background-color: #f5f5f5;
    }

    h1 {
        text-align: center;
        margin: 20px 0;
    }
`;
