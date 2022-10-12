import { FullButton } from "@/components/Atom/Button"
import { NoticeDescription, NoticeTitle } from "@/components/Atom/Letter"
import { BasicButtonContainer, StickyButtonContainer } from "@/components/Molecule/ButtonContainer"
import RoomInfoBox from "@/components/Organism/RoomInfoBox"
import { MixpanelTracking } from "@/utils/sdk/mixpanel"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import Image from "next/image"
import { Background } from "../MainLayout/Wrapper"
import calendarPic from "@/public/images/calendar.png"
import useViewport from "@/hooks/useViewport"

interface InvitationProps {
    title: string
    date: string
    timeArea?: string
    participants: string[]
    isProceeding: boolean
    onClick: ()=>void
}

const InvitationLayout = ({ title, date, timeArea, participants, isProceeding, onClick }: InvitationProps) => {
    const viewport = useViewport()
    
    return (
            <Background>
                <VStack className="mt-10" width="100%">
                    <Image src={calendarPic} alt="calendar" width="100px" height="100px"/>
                    <NoticeTitle className="mb-3">초대합니다</NoticeTitle>
                    <NoticeDescription>약속 가능한 시간을 등록해주세요</NoticeDescription>
                </VStack>
                <RoomInfoBox
                    title={title}
                    date={date}
                    timeArea={timeArea}
                    participants={participants} />
                <BasicButtonContainer marginTop={"14"}>
                    <FullButton
                        style="primary"
                        onClick={() => {
                            MixpanelTracking.getInstance().buttonClicked(timeArea != undefined ? "date/entry: 입장하기" : "entry: 입장하기")
                            onClick()
                        }}
                    >입장하기</FullButton>
                </BasicButtonContainer>
            </Background>
    )

}

export default InvitationLayout