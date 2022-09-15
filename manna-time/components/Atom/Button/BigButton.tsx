import { Button, styled } from "@mui/material"
import { ScriptProps } from "next/script"

interface ButtonProps {
    style?: 'primary' | 'secondary' | 'white-black' | 'lightgrey' | 'disabled',
    children?: React.ReactNode,
    onClick?: ()=>void
}

const theme = {
    'primary': {
        background: '#5194FF',
        text: '#FFFFFF'
    },
    'secondary': {
        background: '#FFFFFF',
        text: '#5194FF',
        border: 'border: 1px solid #DDDDDD;'
    },
    'white-black': {
        background: '#FFFFFF',
        text: '#333333',
        border: 'border: 1px solid #DDDDDD;'
    },
    'lightgrey': {
        background: '#F1F1F1',
        text: '#333333'
    },
    'disabled': {
        background: '#DDDDDD',
        text: '#999999'
    },
}

const BigButton = ({ style, children, onClick }: ButtonProps) => {
    const StyledButton = styled('button', {
        name: "button"
    })`
    /* Auto layout */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 16px 137px;
    gap: 10px;
    
    position: absolute;
    width: 335px;
    height: 58px;
    left: 20px;
    top: 674px;
    
    background: ${style != undefined ? theme[style].background : theme['primary'].background};
    border-radius: 6px;

    /* font style */
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 160%;
    /* identical to box height, or 26px */

    text-align: center;
    letter-spacing: -0.003em;
    color: ${style != undefined ? theme[style].text : theme['primary'].text};
    ${style === 'secondary' || style === 'white-black' ? theme[style].border : null}
    `

    return (
        <StyledButton
            onClick={onClick}
        >
            {children}
        </StyledButton>
    )
}

export default BigButton