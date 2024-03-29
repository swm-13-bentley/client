import useViewport from "@/hooks/useViewport"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import BasicButtonContainer from "./BasicButtonContainer"

interface ButtonContainerProps {
    children?: React.ReactNode
    id?: string
}

const MobileDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 40px;
    margin: auto;
    left: 20px;
    right: 20px;
    gap: 10px;
`

const StickyButtonContainer = ({ children, id }: ButtonContainerProps) => {
    const viewport = useViewport()

    if (viewport === 'mobile')
        return (
            <MobileDiv
                id={id}
            >{children}</MobileDiv>
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