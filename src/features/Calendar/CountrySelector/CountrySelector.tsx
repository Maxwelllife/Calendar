import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../shared/hooks/reduxHooks";
import {fetchCountries, fetchHolidays, setSelectedCountry} from "../calendarSlice";
import {Arrow, CountrySelect, CountrySelectorContainer, CountrySelectWrapper} from "./CountrySelected.styles";
import SpinnerOverlay from "../../../shared/ui/Spiner/Spiner";


const CountrySelector: React.FC = () => {
    const dispatch = useAppDispatch();
    const {countries, selectedCountry, loading} = useAppSelector((state) => state.calendar);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchCountries());
    }, [dispatch]);

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const countryCode = event.target.value;
        dispatch(setSelectedCountry(countryCode));
        const year = new Date().getFullYear();
        dispatch(fetchHolidays({countryCode, year}));
        setIsOpen(false);
    };
    const handleFocus = () => {
        setIsOpen(true);
    };

    const handleBlur = () => {
        setIsOpen(false);
    };

    return (
        <>
            {loading && <SpinnerOverlay/>}
            <CountrySelectorContainer>
                <CountrySelectWrapper>
                    <CountrySelect
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        {countries.map((country) => (
                            <option key={country.countryCode} value={country.countryCode}>
                                {country.name}
                            </option>
                        ))}
                    </CountrySelect>
                    <Arrow isOpen={isOpen}/>
                </CountrySelectWrapper>
            </CountrySelectorContainer>
        </>
    );

};

export default CountrySelector;
