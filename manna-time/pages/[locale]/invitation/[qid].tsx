import { FullButton } from "@/components/Atom/Button"
import { Headline3 } from "@/components/Atom/Letter"
import { PopUpNavbar } from "@/components/Atom/Navbar"
import { Background } from "@/components/Layout/MainLayout/Wrapper"
import { StickyButtonContainer } from "@/components/Molecule/ButtonContainer"
import Hours from "@/components/Molecule/Scheduler/Hours"
import RoomInfoBox from "@/components/Organism/RoomInfoBox"
import { changeDateToKorean } from "@/utils/changeFormat"
import copyTextUrl from "@/utils/copyTextUrl"
import { MixpanelTracking } from "@/utils/sdk/mixpanel"
import { VStack } from "@chakra-ui/react"
import axios from "axios"
import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import tooltipIcon from "@/public/images/tooltip.svg"

interface RoomInfo {
    title: string
    dates: string[]
    startTime: number
    endTime: number
    participants: string[]
}

const Invitation: NextPage = () => {
    const router = useRouter()
    const {locale, qid} = router.query
    // const qid = "5334e361-7755-4cc9-b3d1-fbf319902e7b" // 일정 있음

    const entryUri = `/${locale}/entry/${qid}`

    const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null)
    const [loader, setLoader] = useState(true)

    const srcUrl = process.env.NEXT_PUBLIC_API_URL + '/room/' + qid

    // 방 정보 가져오기 -> 추후에 props로 최적화할 것!
    useEffect(() => {
        axios.get(srcUrl)
            .then((result) => {
                setRoomInfo(result.data);
                if (result.data?.title !== undefined) { setLoader(false); };
            })
            .catch()
    }, [srcUrl]);

    return (<>
        <PopUpNavbar
            onClose={() => {
                router.push(entryUri)
            }}
        />
        <Background>
            <VStack mt="56px">
                <VStack mt="60px" mb="40px">
                    <Headline3>초대하고</Headline3>
                    <Headline3>일정을 함께 정해요</Headline3>
                </VStack>
                {
                    !loader && (
                        <RoomInfoBox
                            title={roomInfo.title}
                            date={`${changeDateToKorean(roomInfo.dates[0])} ~ ${changeDateToKorean(roomInfo.dates[roomInfo.dates.length - 1])}`}
                            timeArea={`${Hours[roomInfo.startTime % 48].realTime} ~ ${Hours[roomInfo.endTime % 48].realTime}`}
                            participants={roomInfo.participants} />
                    )
                }
            </VStack>
            <StickyButtonContainer>
                <Image src={tooltipIcon} alt="tooltip"/>
                <FullButton
                    onClick={() => {
                        MixpanelTracking.getInstance().buttonClicked("entry/종합일정: 초대하기")
                        copyTextUrl(process.env.NEXT_PUBLIC_SERVICE_URL + entryUri + '?invitation=true')
                    }}
                >초대하기</FullButton>
                {/* <FullButton style="secondary">알림받기</FullButton> */}
            </StickyButtonContainer>
        </Background>
    </>)
}

export default Invitation