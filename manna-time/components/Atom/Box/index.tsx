import { Box, styled } from "@mui/system"

interface BoxProps {
    style?: 'primary' | 'secondary'
    children?: React.ReactNode
}

const CustomBox = ({style, children} : BoxProps) => {
    const StyledBox = styled(Box, {
        name: 'box'
    })`
    width: 100%;
    padding: 20px 20px;

    background: ${style === 'primary' ? '#5194FF' : '#F7F7F7'};
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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