import styled from "styled-components";

export const CountrySelectorContainer = styled.div`
    position: relative;
`;

export const CountrySelectWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const CountrySelect = styled.select`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    appearance: none;
    background-color: #fff;
    cursor: pointer;
    
    &::-ms-expand {
        display: none;
    }
`;

export const Arrow = styled.div<{ isOpen: boolean }>`
    position: absolute;
    top: 50%;
    right: 10px;
    width: 5px;
    height: 5px;
    transform: translateY(-50%) rotate(${(props) => (props.isOpen ? "-45deg" : "135deg")});
    border-right: 1px solid #000;
    border-top: 1px solid #000;
    transition: transform 0.3s ease;
    pointer-events: none;
`;
