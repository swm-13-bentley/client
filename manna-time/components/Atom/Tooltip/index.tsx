import Image from "next/image"
import pinkTriangle from "@/public/images/pinkTriangle.svg"
import { styled } from "@mui/material"

interface TooltipProps {
    content: string
}

const StyledDiv = styled('div',{})`
    /* Auto layout */

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 10px;
    gap: 10px;

    background: #FF5194;
    border-radius: 4px;
    position: absolute;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 100%;
    /* identical to box height, or 14px */

    text-align: center;
    letter-spacing: -0.003em;

    color: #FFFFFF;


    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
`

const StyledImage = styled(Image, {})`
    position: relative;
    width: 16px;
    height: 16px;
    top: 100px;
    left: 100px;
    float: center;
`

const Tooltip = ({ content }: TooltipProps) => {
    return (
        <>
            <StyledDiv>
                <p>참석자를 초대해주세요</p>
            </StyledDiv>
            <StyledImage src={pinkTriangle} alt="pink triangle" />
        </>
            

    )
}

export default Tooltip