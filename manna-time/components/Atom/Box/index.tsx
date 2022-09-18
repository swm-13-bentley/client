import { Box, styled } from "@mui/system"

interface BoxProps {
    style?: 'primary' | 'secondary' | 'skyblue'
    children?: React.ReactNode
}

const theme = {
    primary: '#5194FF',
    secondary: '#F7F7F7',
    skyblue: '#F4F8FF'
}

const CustomBox = ({style, children} : BoxProps) => {
    const StyledBox = styled(Box, {
        name: 'box'
    })`
    position: relative;
    width: 100%;
    max-width: 350px;
    padding: 20px 20px;

    background: ${style!= undefined && theme[style]};
    border-radius: 6px;
    `

    return <StyledBox>{children}</StyledBox>
}

const BorderBox = ({ children }: BoxProps) => {
    const StyledBox = styled(Box, {
        name:'border-box'
    })`
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 16px;
    gap: 10px;

    width: 100%;

    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 6px;
    `
    return <StyledBox>
        {children}
    </StyledBox>
}

export { CustomBox, BorderBox }