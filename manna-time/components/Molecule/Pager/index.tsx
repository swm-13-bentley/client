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
    onRightClick: () => void
}

const StyledDiv = styled.div`
    margin:auto;
    max-width : 350px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    vertical-align: middle;
    margin-bottom: 23px;
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

const StyledIconButton = styled(IconButton, {})<{direction: 'left' | 'right'}>`
    float: ${({ direction }) => direction};
    margin-${({ direction }) => direction} : 12.5%;
`

const Pager = ({title, firstPage, lastPage, onLeftClick, onRightClick}: PagerProps) => {
    
    return (<>
        <StyledDiv>
            <StyledIconButton direction="left" size="small" onClick={onLeftClick}>
                <ArrowBackIosNewIcon sx={firstPage ? {color: "#DDDDDD"} : {color: "#333333"}} fontSize="small"/>
            </StyledIconButton>

            <StyledH1>{title}</StyledH1>

            <StyledIconButton direction="right" size="small" onClick={onRightClick}>
                <ArrowForwardIosIcon sx={lastPage ? {color: "#DDDDDD"} : {color: "#333333"}} fontSize="small"/>
            </StyledIconButton>

        </StyledDiv>
        <Line color="lightgrey"/>
    </>)
}

export default Pager