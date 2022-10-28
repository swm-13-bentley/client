import { CustomBox } from "@/components/Atom/Box"
import { BasicButton } from "@/components/Atom/Button"
import Line from "@/components/Atom/Line"
import ConfirmModal from "@/components/Organism/ConfirmModal";
import { ModalState } from "@/src/state/Modal";
import styled from "@emotion/styled"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";


interface RankProps {
    rank: number
    time: string
    participants: string[]
    startTime?: number
    endTime?: number
    date: string
    roomUuid: string
}

const StyledSpan = styled.span < { color: string; } >`
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 150%;
        /* identical to box height, or 24px */
        
        letter-spacing: -0.003em;
        align-self: center;
        
        color: ${({ color }) => color}
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
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 150%;
        /* identical to box height, or 21px */

        letter-spacing: -0.003em;

        color: #999999;
`

const Rank = ({ rank, time, participants, startTime, endTime, date, roomUuid }: RankProps) => {

    const [isOpen, setIsOpen] = useState(false)
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    const [thisClicked, setThisClicked] = useState(false)

    useEffect(() => {
        if (isModalShown == false)
            setThisClicked(false)
    },[isModalShown])

    return (
        <CustomBox style="secondary">
            <div className="flex flex-row space-x-3 relative h-9 mb-3">
                <StyledSpan color="#5194FF">
                    {rank}위
                </StyledSpan>
                <StyledSpan color="#333333">
                    {time}
                </StyledSpan>
                <BasicButton
                    onClick={() => {
                        setThisClicked(true)
                        setIsModalShown(true)
                    }}
                >확정</BasicButton>
                {
                    thisClicked && isModalShown && (
                        startTime != undefined && endTime != undefined
                            ?
                            < ConfirmModal startTime={startTime} endTime={endTime} date={date} roomUuid={roomUuid} />
                        :
                        < ConfirmModal date={date} roomUuid={roomUuid} />
                    )
                }
            </div>
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

export default Rank