import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CalendarPage from '../pages/CalendarPage';
import { GlobalStyles } from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import {theme} from "./styles/theme";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
            <GlobalStyles />
            <CalendarPage />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
