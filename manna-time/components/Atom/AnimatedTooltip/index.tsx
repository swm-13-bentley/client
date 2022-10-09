import { css, keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import Image from "next/image";
import tooltipIcon from "@/public/images/tooltip2.svg"

interface TooltipProps {
    active: boolean
}

const animation = keyframes`
    from {
      transform: rotate(3deg);
    }
    to {
      transform: rotate(-3deg);
    }
`

const AnimatedImage = styled(Image) <{ active: boolean }>`
    ${props => props.active && (
        css`animation: ${animation} .3s infinite;`
    )}
`

const tooltip = ({ active }: TooltipProps) => {
    return (
        <AnimatedImage active={active} src={tooltipIcon} alt="tooltip" height="50px" />
    )
}

export default tooltip