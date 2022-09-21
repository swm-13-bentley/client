import { Box, styled } from "@mui/system"

interface BoxProps {
    style?: 'primary' | 'secondary' | 'skyblue'
    children?: React.ReactNode
    gap?: string
}

const theme = {
    primary: '#5194FF',
    secondary: '#F7F7F7',
    skyblue: '#F4F8FF'
}

const CustomBox = ({style, children, gap} : BoxProps) => {
    const StyledBox = styled(Box, {
        name: 'box'
    })`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    padding: 20px 20px;

    background: ${style && theme[style]};
    gap: ${gap};
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
    white-space: normal;
    margin-top:20px;
    margin-bottom : 20px;
    `
    return <StyledBox>
        {children}
    </StyledBox>
}

export { CustomBox, BorderBox }