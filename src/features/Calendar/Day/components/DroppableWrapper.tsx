import React from "react";
import { useDroppable } from "@dnd-kit/core";

interface DroppableWrapperProps {
    id: string;
    data: any;
    children: React.ReactNode;
}

const DroppableWrapper: React.FC<DroppableWrapperProps> = ({ id, data, children }) => {
    const { setNodeRef } = useDroppable({
        id,
        data,
    });

    return <div ref={setNodeRef}>{children}</div>;
};

export default DroppableWrapper;
