import { styled } from "@mui/material"
import { Box } from "@mui/system"

type Theme = {
    [key: string]: string;
}

const theme: Theme = {
    'lightgrey': '#EEEEEE',
    'white': '#FFFFFF',
    'grey': '#333333'
    
}

interface LineProps {
    color: 'lightgrey' | 'white' | 'grey'
}

const Line = ({ color }: LineProps) => {
    let StyledLine
    if (color === 'lightgrey')
        StyledLine = styled(Box, {})`
            width: 100%;
            height: 1px;
            background: #EEEEEE;
            `
    else 
        StyledLine = styled(Box,{})`
            width: 100%;
            height: 0px;
            
            opacity: 0.2;
            border: 1px solid ${theme[color]};
            `
    
    return (<StyledLine/>)
}

export default Line