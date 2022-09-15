import { styled } from "@mui/material"
import React from "react"

interface ButtonProps {
    children?: React.ReactNode,
    onClick?: () => void
}

const StyledButton = styled('button', {
    name: 'basic-button'
})`
/* Auto layout */
display: flex;
flex-direction: row;
align-items: flex-start;
padding: 10px;
gap: 10px;


background: #FFFFFF;
border: 1px solid #DDDDDD;
border-radius: 6px;

font-family: 'Pretendard';
font-style: normal;
font-weight: 500;
font-size: 14px;
line-height: 100%;
/* identical to box height, or 14px */

text-align: center;
letter-spacing: -0.003em;

color: #333333;
`

const BasicButton = ({ children, onClick }:ButtonProps) => {
    return (<StyledButton
        onClick={onClick}
    >{children}</StyledButton>)
}

export default BasicButton