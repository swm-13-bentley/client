import { css, keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import React from "react"

interface ProgressBarProps {
    from: number // 0 < filled < 1
    to: number
}

const UnfilledProgressbar = styled.div`
position: fixed;
width: 100%;
height: 2px;
left: 0px;
top: 56px;
z-index: 10;

background: #EEEEEE;
`

const ProgressBar = ({ from, to }: ProgressBarProps) => {
    const animation = keyframes`
        from {
        width: ${from}%;
        }
        to {
        width: ${to}%;
        }
    `
    const FilledProgressbar = styled.div`
        position: fixed;
        height: 2px;
        left: 0px;
        top: 56px;
        z-index: 11;
        background: #5194FF;
        
        ${css`animation: ${animation} .3s forwards`}
    `
    return (<>
        <UnfilledProgressbar />
        <FilledProgressbar/>
    </>)
}

export default React.memo(ProgressBar)