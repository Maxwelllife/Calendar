import React from "react";
import {PriorityContainer, PriorityOption} from "./styles/PrioritySelector.styles";

const priorities = [
    {value: "high", label: "High", color: "#b60101"},
    {value: "medium", label: "Medium", color: "#f3e704"},
    {value: "low", label: "Low", color: "#84bc25"},
];

interface PrioritySelectorProps {
    currentPriority?: "high" | "medium" | "low",
    onChange: (priority: "high" | "medium" | "low") => void,
    onMouseDown: () => void, // Взаємодія почалася
    onMouseUp: () => void, // Взаємодія завершена
}

const PrioritySelector: React.FC<PrioritySelectorProps> = ({currentPriority, onChange, onMouseDown, onMouseUp}) => {
    return (
        <PriorityContainer
            onMouseDown={onMouseDown} // Запускаємо флаг активності
            onMouseUp={onMouseUp} // Скидаємо флаг після взаємодії
        >
            {priorities.map((priority) => (
                <PriorityOption
                    key={priority.value}
                    color={priority.color}
                    selected={currentPriority === priority.value}
                    onClick={() => onChange(priority.value as "high" | "medium" | "low")}
                >
                    <div className="circle"></div>
                    <span className="label">{priority.label}</span>
                </PriorityOption>
            ))}
        </PriorityContainer>
    );
};

export default PrioritySelector;
