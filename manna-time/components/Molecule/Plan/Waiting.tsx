import { CustomBox } from "@/components/Atom/Box"
import Line from "@/components/Atom/Line"
import { useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from "@emotion/styled";
import { Rectangle } from "@/components/Atom/Rectangle";

interface WaitingProps {
    title: string
    date: string
    timeArea?: string
    participants: string[]
}

const StyledButton = styled('button', {})`
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        /* identical to box height, or 21px */
        
        letter-spacing: -0.003em;
        
        color: #333333;
`

const ParticipantSpan = styled.span`
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        /* identical to box height, or 21px */

        letter-spacing: -0.003em;

        color: #999999;
`

const Title = styled.p`
    font-family: 'Pretendard';
    margin-bottom: 8px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    /* identical to box height, or 27px */

    letter-spacing: -0.003em;

    color: #5194FF;
`

const StyledSpan = styled.span`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    /* or 22px */

    letter-spacing: -0.003em;

    color: #333333;
`

const Waiting = ({title, date, timeArea, participants}:WaitingProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <CustomBox style="skyblue">
            <Title>{title}</Title>
                <div className="mb-1 flex flex-left">
                    <Rectangle /><StyledSpan> {date}</StyledSpan>
                </div>
                {
                    timeArea && (

                        <div className="mb-4 flex flex-left">
                            <Rectangle /><StyledSpan>{timeArea}</StyledSpan>
                        </div>
                    )

                }
            <Line color="lightgrey" />
            <StyledButton className="mt-3 w-full text-left" onClick={() => { setIsOpen(!isOpen) }}>
                총 {participants.length}명
                <KeyboardArrowDownIcon className="absolute right-8" />
            </StyledButton>
            {
                isOpen &&
                <ParticipantSpan className="mt-3 flex flex-row space-x-1">
                    {participants.join(' ')}
                </ParticipantSpan>
            }
        </CustomBox>
    )
}

export default Waiting