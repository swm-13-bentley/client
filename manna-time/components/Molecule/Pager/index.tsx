import Line from "@/components/Atom/Line"
import styled from "@emotion/styled"

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from "@mui/material";

interface PagerProps {
    title: string,
    firstPage: boolean,
    lastPage: boolean,
    onLeftClick: () => void,
    onRightClick: () => void,
    hasComment: boolean
}

const StyledDiv = styled.div<{ hasComment: boolean }>`
    margin:auto;
    max-width : 350px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    vertical-align: middle;
    margin-bottom: ${({ hasComment }) => (hasComment ? '16px' : '23px')};
    margin-top: 28px;
    `

const StyledH1 = styled.h1`
    display: inline-block;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 200%;
    /* identical to box height, or 26px */
    
    text-align: center;

    letter-spacing: -0.003em;

    color: #333333;

`

const StyledP = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 160%;
/* or 19px */

text-align: center;
letter-spacing: -0.003em;

color: #5194FF;

margin-bottom: 16px;
`

const StyledIconButton = styled(IconButton, {}) <{ direction: 'left' | 'right' }>`
    float: ${({ direction }) => direction};
    margin-${({ direction }) => direction} : 12.5%;
`

const Pager = ({ title, firstPage, lastPage, onLeftClick, onRightClick, hasComment }: PagerProps) => {

    return (<>
        <StyledDiv hasComment={hasComment}>
            <StyledIconButton direction="left" size="small" onClick={onLeftClick}>
                <ArrowBackIosNewIcon sx={firstPage ? { color: "#DDDDDD" } : { color: "#333333" }} fontSize="small" />
            </StyledIconButton>

            <StyledH1>{title}</StyledH1>

            <StyledIconButton direction="right" size="small" onClick={onRightClick}>
                <ArrowForwardIosIcon sx={lastPage ? { color: "#DDDDDD" } : { color: "#333333" }} fontSize="small" />
            </StyledIconButton>
        </StyledDiv>
        {
            hasComment && <StyledP>약속 가능한 시간을 드래그해주세요</StyledP>
        }
        <Line color="lightgrey" />
    </>)
}

export default Pager