import styled from "@emotion/styled"

interface ProgressBarProps {
    filled: number // 0 < filled < 1
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

const FilledProgressbar = styled.div<{ filled: number }>`
position: fixed;
width: ${({ filled } )=> Math.floor(filled*100) }%;
height: 2px;
left: 0px;
top: 56px;
z-index: 11;

background: #5194FF;
`

const ProgressBar = ({filled}:ProgressBarProps) => {
    return (<>
        <UnfilledProgressbar />
        <FilledProgressbar filled={filled}/>
    </>)
}

export default ProgressBar