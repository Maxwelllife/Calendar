import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import CalendarPage from '../pages/CalendarPage';
import { GlobalStyles } from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import {theme} from "./styles/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
            <GlobalStyles />
            <CalendarPage />
            </ThemeProvider>
            <ToastContainer position="top-right" autoClose={3000} />
        </Provider>
    );
}

export default App;
