import styled from 'styled-components';

const Stripe = styled.div<{ isActive: boolean }>`
    height: 8px;
    width: ${({ isActive }) => (isActive ? '54px' : '45px')};
    margin: 4px 0;
    border-radius: 4px;
    background-color: #ccc;
    cursor: pointer;
    opacity: 0.7;
    transition: transform 0.2s, opacity 0.2s;
    
    &:hover {
        opacity: 1;
    }
`;

interface TaskStripeProps {
    isActive: boolean;
    onClick: () => void;
}

const TaskStripe: React.FC<TaskStripeProps> = ({ isActive, onClick }) => (
    <Stripe isActive={isActive} onClick={onClick} />
);

export default TaskStripe;
