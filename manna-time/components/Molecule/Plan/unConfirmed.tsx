import { CustomBox } from "@/components/Atom/Box"
import Line from "@/components/Atom/Line"
import { useEffect, useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from "@emotion/styled";
import { Rectangle } from "@/components/Atom/Rectangle";
import { Box } from "@mui/material";
import { FullButton } from "@/components/Atom/Button";
import { Rank } from "@/components/Organism/RankContainer";
import { useRouter } from "next/router";
import { changeTimeFormat, dateConversion, getKoDateRange } from "@/utils/changeFormat";
import Option from "@/components/Atom/Option"
import { useRecoilState } from "recoil";
import { ModalState } from "@/src/state/Modal";
import DeleteModal from "@/components/Organism/Modal/DeleteModal";
import axios from "axios";

export interface UnConfirmedPlan {
    count: number
    roomTitle: string
    roomUuid: string
    roomDates: string[]
    isDayOnly: boolean
    startTime?: string
    endTime?: string
    participants: string[]
    topOne?: Rank
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

const StyledTitleSpan = styled.span`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */

    letter-spacing: -0.003em;

    color: #333333;
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

const StyledLine = styled(Box, {})`
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    background: #EEEEEE;
    `

const Unconfirmed = ({ plan, onDelete }: { plan: UnConfirmedPlan, onDelete:()=>void }) => {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    const [thisClicked, setThisClicked] = useState(false)

    useEffect(() => {
        if (isModalShown == false)
            setThisClicked(false)
    }, [isModalShown])

    return (
        <CustomBox style="skyblue">
            <Option onDelete={() => {
                setIsModalShown(true)
                setThisClicked(true)
            }} />
            {
                isModalShown && thisClicked && (
                    <DeleteModal onDelete={()=>onDelete()} />
                )
            }
            <button style={{ position: "absolute", right: "20px", top: "25px" }}>
            </button>
            <Title>{plan.roomTitle}</Title>
            <div className="mb-4">
                <div className="mb-1 flex flex-left">
                    <Rectangle /><StyledSpan> {getKoDateRange(plan.roomDates)}</StyledSpan>
                </div>
                {
                    plan.startTime && plan.endTime && (
                        <div className="flex flex-left">
                            <Rectangle /><StyledSpan>{changeTimeFormat(plan.startTime)} ~ {changeTimeFormat(plan.endTime)}</StyledSpan>
                        </div>
                    )

                }
            </div>
            <Line color="lightgrey" />
            <div className="mb-4">
                <div className="mb-4">
                    <StyledButton className="mt-3 w-full text-left" onClick={() => { setIsOpen(!isOpen) }}>
                        총 {plan.participants.length}명
                        <KeyboardArrowDownIcon className="absolute right-8 z-0" />
                    </StyledButton>
                    {
                        isOpen &&
                        <ParticipantSpan className="mt-3 flex flex-row space-x-1">
                            {plan.participants.join(' ')}
                        </ParticipantSpan>
                    }
                </div>
                <StyledLine />
            </div>
            {
                plan.topOne && (
                    <Title className=" mb-6">
                        1위
                        <StyledTitleSpan className=" ml-2">{
                            plan.topOne.startTime != undefined && plan.topOne.endTime != undefined
                                ?
                                `${dateConversion(plan.topOne.availableDate)} ${changeTimeFormat(plan.topOne.startTime)} ~ ${changeTimeFormat(plan.topOne.endTime)}`
                                :
                                dateConversion(plan.topOne.availableDate)
                        }</StyledTitleSpan>
                    </Title>
                )
            }
            <FullButton size="x-small" style="white-black"
                onClick={() => {
                    if (plan.isDayOnly)
                        router.push(`/${router.query.locale}/date/entry/${plan.roomUuid}`)
                    else
                        router.push(`/${router.query.locale}/entry/${plan.roomUuid}`)
                }}
            >일정 확인하러 가기</FullButton>
        </CustomBox>
    )
}

export default Unconfirmed