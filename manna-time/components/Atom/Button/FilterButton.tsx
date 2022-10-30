import { styled } from "@mui/system"

interface FilterButtonProps {
    checked: boolean,
    children?: React.ReactNode,
    onClick?: () => void
}

const theme = {
    'off': {
        borderColor: '#EEEEEE',
        textColor: '#999999'
    },
    'on': {
        borderColor: '#8EBAFF',
        textColor: '#5194FF'
    }
}

const FilterButton = ({ checked, children, onClick }: FilterButtonProps) => {
    const StyledButton = styled('button', {
        name: 'filter-button'
    })`
    /* Auto layout */

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 8px;
    gap: 8px;

    height: 28px;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 100%;
    /* identical to box height, or 12px */

    letter-spacing: -0.003em;

    color: ${checked ? theme['on'].textColor : theme['off'].textColor}; 
    
    border: 1px solid ${checked ? theme['on'].borderColor : theme['off'].borderColor};
    border-radius: 4px;
    `

    return <StyledButton onClick={onClick}> {children} </StyledButton>
}

export default FilterButton