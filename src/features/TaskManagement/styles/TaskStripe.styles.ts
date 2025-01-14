import styled from "styled-components";

export const Stripe = styled.div<{ $isActive: boolean, $priority?: "high" | "medium" | "low" }>`
    height: 8px;
    width: ${({ $isActive }) => ($isActive ? '58px' : '45px')};
    margin: 4px 0;
    border-radius: 4px;
    background-color: ${({ $priority }) => {
    if ($priority === "high") return "#b60101";
    if ($priority === "medium") return "#f3e704";
    if ($priority === "low") return "#84bc25";
    return "#ccc";
}};
    cursor: pointer;
    border: ${({ $isActive }) => ($isActive ? '1px solid #ddd' : '1px solid transparent')} ;
    opacity: ${({ $isActive }) => ($isActive ? '1' : '0.6')};
    transition: transform 0.2s, opacity 0.2s;
    pointer-events: auto;
    
    &:hover {
        opacity: 1;
        border: 1px solid #ddd;
    }
`;