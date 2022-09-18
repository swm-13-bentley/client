import { CustomBox } from "@/components/Atom/Box"
import { BasicButton } from "@/components/Atom/Button"
import Line from "@/components/Atom/Line"
import styled from "@emotion/styled"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";


interface RankProps {
    rank: number,
    time: string,
    participants: string[]
}

const Rank = ({ rank, time, participants }: RankProps) => {

    const [isOpen, setIsOpen] = useState(false)
    
    const StyledSpan = styled.span < { color: string; } >`
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 150%;
        /* identical to box height, or 24px */
        
        letter-spacing: -0.003em;
        align-self: center;
        
        color: ${({ color }) => color }
    `

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
        ont-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        /* identical to box height, or 21px */

        letter-spacing: -0.003em;

        color: #999999;
    `

    return (
        <CustomBox style="secondary">
            <div className="flex flex-row space-x-3 relative h-9 mb-3">
                <StyledSpan color="#5194FF">
                    {rank}위
                </StyledSpan>
                <StyledSpan color="#333333">
                    {time}
                </StyledSpan>
                <BasicButton>확정</BasicButton>
            </div>
            <Line color="primary" />
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

export default Rank