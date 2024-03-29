import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, VStack } from "@chakra-ui/react"
import { GetServerSideProps, NextPage } from "next"
import React, { SyntheticEvent, useEffect, useState } from "react"
import Scheduler from "@/components/Molecule/Scheduler/Scheduler"
import { useRouter } from "next/router";

import axios from "axios";
import TabLayout from "@/components/Layout/TabLayout";
import FilterAccordion from "@/components/Organism/FilterAccordion";
import ClickTimeBox from "@/components/Organism/ClickTimeBox";
import { useRecoilValue } from "recoil";
import { clickParticipantState, clickTimeState } from "@/src/state/ClickScheduler";
import RankContainer, { Rank } from "@/components/Organism/RankContainer";
import { Background } from "@/components/Layout/MainLayout/Wrapper";
import RoomInfoBox from "@/components/Organism/RoomInfoBox";
import Hours from "@/components/Molecule/Scheduler/Hours";
import { getKoDateRange } from "@/utils/changeFormat";
import { FullButton } from "@/components/Atom/Button";
import { BasicButtonContainer, StickyButtonContainer } from "@/components/Molecule/ButtonContainer";
import { MixpanelTracking } from "@/utils/sdk/mixpanel";
import copyTextUrl from "@/utils/copyTextUrl";
import InvitationLayout from "@/components/Layout/InvitationLayout";
import EmptyRank from "@/components/Organism/EmptyRank";
import Image from "next/image";

import kakaoIcon from "@/public/icons/kakao.svg"
import { getShareTemplate } from "@/utils/sdk/kakaoShare";
import { RoomInfo } from "@/models/roomInfo";
import AnimatedTooltip from "@/components/Atom/AnimatedTooltip";

const Entry: NextPage = function () {

    const router = useRouter()
    
    const { qid, invitation } = router.query
    let [showInvitation, setShowInvitation] = useState(false)

    useEffect(() => {
        if (invitation != undefined && invitation == 'true')
            setShowInvitation(true)
    }, [invitation])

    const srcUrl = process.env.NEXT_PUBLIC_API_URL + '/room/' + qid
    const textUrl = process.env.NEXT_PUBLIC_SERVICE_URL + '/ko/entry/' + qid + '?invitation=true'

    const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null)
    const [loader, setLoader] = useState(true)
    const [groupSchedule, setGroupSchedule] = useState(null)
    const [groupFilterChecked, setGroupFilterChecked] = useState(null)
    const [participantNames, setParticipantNames] = useState(null)

    const [timeRanks, setTimeRanks] = useState<Rank[] | undefined>(undefined)

    const clickedTime = useRecoilValue(clickTimeState)
    const clickedParticipants = useRecoilValue(clickParticipantState)

    useEffect(() => {
        if (qid!=undefined)
            axios.get(srcUrl)
                .then((result) => {
                    setRoomInfo(result.data);
                    if (result.data?.title !== undefined) { setLoader(false); };
                })
    }, [srcUrl]);

    // 전체 스케줄 가져오기
    useEffect(() => {
        if (qid!=undefined)
            axios.get(srcUrl + '/group')
                .then((result) => {
                    setGroupSchedule(result.data);

                    let tempParticipantNames: string[] = []
                    result.data.forEach(obj => {
                        tempParticipantNames.push(obj.participantName)
                    })
                    setParticipantNames(tempParticipantNames)
                })
    }, [srcUrl]);

    // top 5 time ranks 가져오기
    useEffect(() => {
        if (qid!=undefined)
            axios.get(srcUrl + '/top/5')
                .then((result) => {
                    setTimeRanks(result.data)
                })
    }, [srcUrl])

    const [tab, setTab] = useState(0)
    const [enter, setEnter] = useState(false)
    const [shake, setShake] = useState(false)

    const handleNoParticipantClick = () => {
        setShake(true)
        setTimeout(()=>setShake(false), 700)
    }

    if (showInvitation && !enter) {
        return (
            roomInfo && participantNames && qid && (
                <InvitationLayout
                    title={roomInfo.title}
                    date={`${getKoDateRange(roomInfo.dates)}`}
                    timeArea={`${Hours[roomInfo.startTime % 48].realTime} ~ ${Hours[roomInfo.endTime % 48].realTime}`}
                    participants={participantNames}
                    isProceeding={true}
                    onClick={() => { setEnter(true) }}
                    uuid={qid}
                />

            )
        )
    } else return (
        <>

            <TabLayout
                value={tab}
                tabLabel={["종합 일정", "순위", "약속 정보"]}
                onChange={setTab}
            >
                {
                    roomInfo && participantNames && (
                        <div className={tab == 0 ? "mb-20" : "hidden"}>
                            <div onClick={roomInfo.participants.length == 0 ? handleNoParticipantClick : ()=>{}}>
                                <Scheduler
                                    groupSchedule={groupSchedule}
                                    isGroup={true}
                                    roomInfo={roomInfo}
                                    isDisabled={true}
                                    groupFilterChecked={groupFilterChecked}
                                    participantNames={participantNames}
                                >
                                    <div className="mb-5 mt-5">
                                        <FilterAccordion
                                            participantNames={participantNames}
                                            onChange={checked => setGroupFilterChecked(checked)}
                                            isChecked={null}
                                        />
                                    </div>
                                </Scheduler>
                            </div>

                            <Background>
                                <div className={participantNames.length > 0 ? "" : "hidden"}>
                                    <ClickTimeBox
                                        time={clickedTime}
                                        participants={clickedParticipants}
                                    />
                                </div>


                                <BasicButtonContainer marginTop={"12"}>
                                    {
                                        roomInfo.participants.length == 0 && (
                                            <AnimatedTooltip active={shake} />
                                        )
                                    }
                                    <FullButton style="primary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("entry/종합일정: 입장하기")
                                            router.push(`/${router.query.locale}/participant-login/${qid}`);
                                        }}
                                    >입장하기</FullButton>
                                    <FullButton
                                        style="secondary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("entry/종합일정: 초대하기")
                                            copyTextUrl(textUrl)
                                        }}
                                    >초대하기</FullButton>
                                </BasicButtonContainer>
                            </Background>

                        </div>
                    )
                }
                {
                    !loader && timeRanks != undefined && participantNames != null && (
                        <div className={tab == 1 ? "mb-20" : "hidden"}>
                            {
                                participantNames.length == 0
                                    ?
                                    <EmptyRank url={`/${router.query.locale}/participant-login/${qid}`} />
                                    :
                                    <Background>
                                        <RankContainer
                                            ranks={timeRanks}
                                            totalNum={participantNames.length}                                         
                                        />
                                        <BasicButtonContainer marginTop={"12"}>
                                            <FullButton style="kakao"
                                                onClick={() => {
                                                    MixpanelTracking.getInstance().buttonClicked("entry/순위: 카카오로 공유하기")


                                                    const { Kakao, location } = window
                                                    const template = getShareTemplate(timeRanks, roomInfo, qid)
                                                    console.log(template)
                                                    Kakao.Share.sendDefault(template);
                                                }}
                                            >
                                                <Image src={kakaoIcon} alt="kakao" />
                                                카카오로 공유하기
                                            </FullButton>
                                            {/* <FullButton style="primary">알림 받기</FullButton>
                                            <FullButton style="secondary">이미지로 저장하기</FullButton> */}
                                        </BasicButtonContainer>
                                    </Background>
                            }
                        </div>
                    )
                }
                {
                    roomInfo && participantNames != undefined && (
                        <div className={tab == 2 ? "mb-20" : "hidden"}>
                            <Background>
                                <RoomInfoBox
                                    title={roomInfo.title}
                                    date={`${getKoDateRange(roomInfo.dates)}`}
                                    timeArea={`${Hours[roomInfo.startTime % 48].realTime} ~ ${Hours[roomInfo.endTime % 48].realTime}`}
                                    participants={participantNames} />
                                <StickyButtonContainer>
                                    <FullButton
                                        style="secondary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("entry/약속정보: 초대하기")
                                            copyTextUrl(textUrl)
                                        }}
                                    >초대하기</FullButton>
                                </StickyButtonContainer>
                            </Background>
                        </div>
                    )

                }


                {/* <Center mb="5">
                                                    <Button
                                                        className="mr-5"
                                                        variant="contained"
                                                        startIcon={<ContentCopyIcon />}
                                                        onClick={() => {
                                                            MixpanelTracking.getInstance().buttonClicked("entry: 초대하기")
                                                            copyTextUrl(textUrl)
                                                        }}
                                                    >
                                                        방 초대하기
                                                    </Button>
                                                    <Button
                                                        variant="contained"
                                                        startIcon={<LoginIcon />}
                                                        onClick={(e: React.SyntheticEvent) => {
                                                            setExpanded(false)
                                                            MixpanelTracking.getInstance().buttonClicked("entry: 내 시간 입력(아코디언 접기)")
                                                        }}
                                                    >
                                                        내 시간 입력
                                                    </Button>
                                                </Center> */}

            </TabLayout>
        </>
    )
}

export default Entry