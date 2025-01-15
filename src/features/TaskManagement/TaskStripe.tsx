import React from "react";
import {Stripe} from "./styles/TaskStripe.styles";

interface TaskStripeProps {
    isActive: boolean;
    priority?: "high" | "medium" | "low";
    onPointerUp: () => void;
}

const TaskStripe: React.FC<TaskStripeProps> = ({ isActive, priority, onPointerUp }) => {
    return(
        <Stripe $isActive={isActive} $priority={priority}  onPointerUp={onPointerUp}/>
    );
}

export default TaskStripe;
