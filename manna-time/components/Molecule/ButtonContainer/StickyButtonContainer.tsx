import useViewport from "@/hooks/useViewport"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import BasicButtonContainer from "./BasicButtonContainer"

interface ButtonContainerProps {
    children?: React.ReactNode
}

const MobileDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 80px;
    margin: auto;
    left: 20px;
    right: 20px;
`

const StickyButtonContainer = ({ children }: ButtonContainerProps) => {
    const viewport = useViewport()

    if (viewport === 'mobile')
        return (
            <MobileDiv>{children}</MobileDiv>
        )
    if (viewport === 'desktop')
        return (
            <BasicButtonContainer marginTop={'12'}>
                {children}
            </BasicButtonContainer>
        )
    return null
}

export default StickyButtonContainer