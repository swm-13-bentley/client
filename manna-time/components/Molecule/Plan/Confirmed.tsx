import { CustomBox } from "@/components/Atom/Box"
import Line from "@/components/Atom/Line"
import { useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import styled from "@emotion/styled";
import { Rectangle } from "@/components/Atom/Rectangle";
import { Box } from "@mui/material";
import { FullButton } from "@/components/Atom/Button";
import { Rank } from "@/components/Organism/RankContainer";
import { useRouter } from "next/router";
import { changeDateToKorean, changeTimeFormat, dateConversion, getKoDateRange } from "@/utils/changeFormat";
import { MixpanelTracking } from "@/utils/sdk/mixpanel";

export interface ConfirmedPlanProps {
    roomTitle: string
    roomUuid: string
    isDayOnly: boolean
    participants: string[]
    confirmedDate: string
    confirmedStartTime?: string
    confirmedEndTime?: string
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

const Confirmed = ({ plan }: { plan: ConfirmedPlanProps }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <CustomBox style="secondary">
            <Title>{plan.roomTitle}</Title>
            <div className="mb-4">
                <div className="mb-1 flex flex-left">
                    <Rectangle />
                    {
                        plan.confirmedStartTime == undefined || plan.confirmedEndTime == undefined
                            ?
                            <StyledSpan> {changeDateToKorean(plan.confirmedDate)}</StyledSpan>
                            :
                            <StyledSpan> {dateConversion(plan.confirmedDate)} {changeTimeFormat(plan.confirmedStartTime)} ~ {changeTimeFormat(plan.confirmedEndTime)}</StyledSpan>
                    }
                </div>
            </div>
            <Line color="lightgrey" />
            <div className="mb-4">
                <div className="mb-4">
                    <StyledButton className="mt-3 w-full text-left" onClick={() => { setIsOpen(!isOpen) }}>
                        총 {plan.participants.length}명
                        <KeyboardArrowDownIcon className="absolute right-8" />
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
            <FullButton size="x-small" style="white-black"
                onClick={() => {
                    MixpanelTracking.getInstance().buttonClicked("plans/확정된약속: 일정 확인하러 가기")
                    if (plan.isDayOnly)
                        router.push(`/${router.query.locale}/date/entry/${plan.roomUuid}`)
                    else
                        router.push(`/${router.query.locale}/entry/${plan.roomUuid}`)
                }}
            >일정 확인하러 가기</FullButton>
        </CustomBox>
    )
}

export default Confirmed