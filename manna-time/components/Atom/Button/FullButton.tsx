import { Button, styled } from "@mui/material"
import { ScriptProps } from "next/script"

interface ButtonProps {
    style?: 'primary' | 'secondary' | 'white-black' | 'lightgrey' | 'disabled' | 'kakao',
    children?: React.ReactNode,
    onClick?: () => void,
    size?: 'small' | 'large' | 'x-small'
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
    'kakao': {
        background: '#FAE100',
        text: '#333333'
    }
}

const sizeTheme = {
    'small': {
        fontSize: '14px',
        height: '46px'
    },
    'large': {
        fontSize: '16px',
        height: '58px'
    },
    'x-small': {
        fontSize: '14px',
        height: '34px'
    }
}

const FullButton = ({ style, children, onClick, size }: ButtonProps) => {
    const StyledButton = styled('button', {
        name: "button"
    })`
    /* Auto layout */
    position: relative;
    padding: 16px;
    gap: 4px;
    
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    max-width: 350px;
    height: ${size != undefined ? sizeTheme[size].height : sizeTheme['large'].height};
    
    background: ${style != undefined ? theme[style].background : theme['primary'].background};
    border-radius: 6px;

    /* font style */
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: ${size != undefined ? sizeTheme[size].fontSize : sizeTheme['large'].fontSize};
    line-height: 160%;
    /* identical to box height, or 26px */

    text-align: center;
    letter-spacing: -0.003em;
    color: ${style != undefined ? theme[style].text : theme['primary'].text};
    ${style === 'secondary' || style === 'white-black' ? theme[style].border : null}
    `

    if (style == "disabled")
        return (
            <StyledButton
                disabled
                onClick={onClick}
            >
                {children}
            </StyledButton>
        )
    else return (
        <StyledButton
            onClick={onClick}
        >
            {children}
        </StyledButton>
    )
}

export default FullButton