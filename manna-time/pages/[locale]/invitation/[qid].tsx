import { FullButton } from "@/components/Atom/Button"
import { Headline3 } from "@/components/Atom/Letter"
import { PopUpNavbar } from "@/components/Atom/Navbar"
import { Background } from "@/components/Layout/MainLayout/Wrapper"
import { BasicButtonContainer, StickyButtonContainer } from "@/components/Molecule/ButtonContainer"
import Hours from "@/components/Molecule/Scheduler/Hours"
import RoomInfoBox from "@/components/Organism/RoomInfoBox"
import { getKoDateRange } from "@/utils/changeFormat"
import copyTextUrl from "@/utils/copyTextUrl"
import { MixpanelTracking } from "@/utils/sdk/mixpanel"
import { VStack } from "@chakra-ui/react"
import axios from "axios"
import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import tooltipIcon from "@/public/images/tooltip.svg"
import useViewport from "@/hooks/useViewport"

interface RoomInfo {
    title: string
    dates: string[]
    startTime: number
    endTime: number
    participants: string[]
}

const Invitation: NextPage = () => {
    const router = useRouter()

    const { locale, qid, dayOnly } = router.query
    // const qid = "5334e361-7755-4cc9-b3d1-fbf319902e7b" // 일정 있음

    const [entryUri, setEntryUri] = useState("")
    const [srcUrl, setSrcUrl] = useState("")

    useEffect(() => {
        if (qid != undefined) {
            if (dayOnly == 'true') {
                setEntryUri(`/${locale}/date/entry/${qid}`)
                setSrcUrl(process.env.NEXT_PUBLIC_API_URL + '/day/room/' + qid)
            } else {
                setEntryUri(`/${locale}/entry/${qid}`)
                setSrcUrl(process.env.NEXT_PUBLIC_API_URL + '/room/' + qid)
            }
        }
    }, [dayOnly, qid])

    const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null)
    const [loader, setLoader] = useState(true)


    // 방 정보 가져오기 -> 추후에 props로 최적화할 것!
    useEffect(() => {
        if (dayOnly != 'undefined' && srcUrl != "") {
            axios.get(srcUrl)
                .then((result) => {
                    setRoomInfo(result.data);
                    if (result.data?.title !== undefined) { setLoader(false); };
                })
                .catch()
        }
    }, [srcUrl, dayOnly]);

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
                    !loader && roomInfo != undefined && roomInfo != null && (
                        dayOnly
                            ?
                            <RoomInfoBox
                                title={roomInfo.title}
                                date={`${getKoDateRange(roomInfo.dates)}`}
                                participants={roomInfo.participants} />
                            :
                            <RoomInfoBox
                                title={roomInfo.title}
                                date={`${getKoDateRange(roomInfo.dates)}`}
                                timeArea={`${Hours[roomInfo.startTime % 48].realTime} ~ ${Hours[roomInfo.endTime % 48].realTime}`}
                                participants={roomInfo.participants} />

                    )
                }
            </VStack>
            <BasicButtonContainer marginTop={"12"}>
                <Image src={tooltipIcon} alt="tooltip" />
                <FullButton
                    onClick={() => {
                        MixpanelTracking.getInstance().track("invitation: 초대하기", {roomUuid: qid, dayOnly: dayOnly})
                        copyTextUrl(process.env.NEXT_PUBLIC_SERVICE_URL + entryUri + '?invitation=true')
                    }}
                >초대하기</FullButton>
                <FullButton style="secondary"
                    onClick={() => {
                        MixpanelTracking.getInstance().track("invitation: 입장하기", {roomUuid: qid, dayOnly: dayOnly})
                        router.push(entryUri)
                    }}
                >입장하기</FullButton>
            </BasicButtonContainer>
        </Background>
    </>)
}

export default Invitation