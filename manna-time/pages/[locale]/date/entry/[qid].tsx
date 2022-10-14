import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, VStack } from "@chakra-ui/react"
import { GetServerSideProps, NextPage } from "next"
import React, { CSSProperties, SyntheticEvent, useEffect, useState } from "react"
import Scheduler from "@/components/Molecule/Scheduler/Scheduler"
import { useRouter } from "next/router";

import axios from "axios";
import TabLayout from "@/components/Layout/TabLayout";
import FilterAccordion from "@/components/Organism/FilterAccordion";
import ClickTimeBox from "@/components/Organism/ClickTimeBox";
import { useRecoilState, useRecoilValue } from "recoil";
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
import tooltipIcon from "@/public/images/tooltip2.svg"
import { getShareTemplate } from "@/utils/sdk/kakaoShare";
import { RoomInfoDayOnly } from "@/models/roomInfo";
import { Calendar, DateObject } from "react-multi-date-picker";
import { convertDateCriteria, convertIndividualCriteria, DateCriteria, getFilteredSchedule, GroupSchedule } from "@/utils/date/convertGroup";
import styled from "@emotion/styled";
import {css, keyframes} from "@emotion/react";
import AnimatedTooltip from "@/components/Atom/AnimatedTooltip";


const dateRangeFormat = "YYYY-MM-DD"

const Entry: NextPage = function () {
    const router = useRouter()
    // const qid = "02258fae-f9cb-4582-ba0a-5b78c826ed33" // 일정 있음
    const { invitation, qid } = router.query

    let [showInvitation, setShowInvitation] = useState(false)

    useEffect(() => {
        if (invitation != undefined && invitation == 'true')
            setShowInvitation(true)
    }, [invitation])

    const srcUrl = process.env.NEXT_PUBLIC_API_URL + '/day/room/' + qid
    const textUrl = process.env.NEXT_PUBLIC_SERVICE_URL + '/ko/date/entry/' + qid + '?invitation=true'
    const pushPath = `/${router.query.locale}/participant-login/${qid}?dayOnly=true`
    const [roomInfo, setRoomInfo] = useState<RoomInfoDayOnly | null>(null)

    const [groupFilterChecked, setGroupFilterChecked] = useState<boolean[] | null>(null)
    const [groupSchedule, setGroupSchedule] = useState<GroupSchedule[] | null>(null)
    const [filteredSchedule, setFilteredSchedule] = useState<DateCriteria | null>(null)

    const [timeRanks, setTimeRanks] = useState<Rank[] | undefined>(undefined)

    const [clickedTime, setClickedTime] = useRecoilState(clickTimeState)
    const [clickedParticipants, setClickedParticipants] = useRecoilState(clickParticipantState)

    useEffect(() => {
        if (qid != undefined)
            axios.get(srcUrl)
                .then((result) => {
                    setRoomInfo(result.data);
                    setGroupFilterChecked(Array(result.data.participants.length).fill(true))
                })
    }, [srcUrl]);

    // 전체 스케줄 가져오기
    useEffect(() => {
        if (qid != undefined)
            axios.get(srcUrl + '/group')
                .then((result) => {
                    setGroupSchedule(result.data)
                })
    }, [srcUrl]);

    // top 5 time ranks 가져오기
    useEffect(() => {
        if (qid != undefined)
            axios.get(srcUrl + '/top/5')
                .then((result) => {
                    setTimeRanks(result.data)
                })
    }, [srcUrl])

    useEffect(() => {
        if (groupSchedule != null && roomInfo != undefined && groupFilterChecked != null)
            setFilteredSchedule(getFilteredSchedule(groupSchedule, roomInfo.participants, groupFilterChecked))
    }, [groupFilterChecked, groupSchedule])

    const [tab, setTab] = useState(0)
    const [enter, setEnter] = useState(false)
    const [shake, setShake] = useState(false)

    const handleNoParticipantClick = () => {
        setShake(true)
        setTimeout(()=>setShake(false), 700)
    }

    if (showInvitation && !enter) {
        return (
            roomInfo && qid &&(
                <InvitationLayout
                    title={roomInfo.title}
                    date={`${getKoDateRange(roomInfo.dates)}`}
                    participants={roomInfo.participants}
                    isProceeding={true}
                    onClick={() => { setEnter(true) }}
                    uuid = {qid}
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
                    roomInfo && filteredSchedule && (
                        <div className={tab == 0 ? "mb-20" : "hidden"}>
                            <Background>
                                <Center mt="12px">
                                    <FilterAccordion
                                        participantNames={roomInfo.participants}
                                        onChange={checked => setGroupFilterChecked(checked)}
                                        isChecked={null}
                                    />
                                </Center>
                                <Center mt="20px">
                                    <Calendar className="rmdp-mobile"
                                        onChange={
                                            (date: DateObject) => {
                                                if (roomInfo.participants.length == 0) {
                                                    handleNoParticipantClick()
                                                } else {
                                                    let selected = date.format(dateRangeFormat)
                                                    let participants: string[] = []
                                                    if (filteredSchedule[selected] != undefined)
                                                        participants = filteredSchedule[selected]
    
                                                    setClickedTime(selected)
                                                    setClickedParticipants(participants)
                                                }
                                            }
                                        }
                                        mapDays={({ date, selectedDate, isSameDate }) => {
                                            const formattedDate = date.format(dateRangeFormat)
                                            let isDateRange = roomInfo.dates.includes(formattedDate)

                                            if (isDateRange) {
                                                let props = { className: "", disabled: false, style: {} }
                                                let opacity = 0
                                                let color = "#333333"
                                                let border = "none"
                                                if (filteredSchedule[formattedDate]) {
                                                    opacity = filteredSchedule[formattedDate].length / roomInfo.participants.length
                                                    color = "#ffffff"
                                                }
                                                if (isSameDate(date, selectedDate))
                                                    border = "2px solid #FF5194"

                                                props.style = {
                                                    backgroundColor: `rgba(0, 86, 224, ${opacity})`,
                                                    color: color,
                                                    border: border
                                                }
                                                let isWeekend = [0, 6].includes(date.weekDay.index)

                                                if (isWeekend) props.className = "highlight highlight-red"

                                                return props
                                            }
                                            else return {
                                                disabled: true,
                                                style: { color: "#ccc" },
                                            }
                                        }}
                                        zIndex={1}
                                    />
                                </Center>
                                <div className={roomInfo.participants.length > 0 ? "" : "hidden"}>
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
                                            MixpanelTracking.getInstance().buttonClicked("date/entry/종합일정: 내 일정 등록하기")
                                            router.push(pushPath);
                                        }}
                                    >내 일정 등록/수정하기</FullButton>
                                    <FullButton
                                        style="secondary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("date/entry/종합일정: 초대하기")
                                            copyTextUrl(textUrl)
                                        }}
                                    >초대하기</FullButton>
                                </BasicButtonContainer>
                            </Background>

                        </div>
                    )
                }
                {
                    roomInfo && timeRanks != undefined && (
                        <div className={tab == 1 ? "mb-20" : "hidden"}>
                            {
                                roomInfo.participants.length == 0
                                    ?
                                    <EmptyRank url={pushPath} />
                                    :
                                    <Background>
                                        <RankContainer
                                            ranks={timeRanks}
                                            totalNum={roomInfo.participants.length}
                                        />
                                        <BasicButtonContainer marginTop={"12"}>
                                            <FullButton style="kakao"
                                                onClick={() => {
                                                    MixpanelTracking.getInstance().buttonClicked("date/entry/순위: 카카오로 공유하기")

                                                    const { Kakao } = window
                                                    const template = getShareTemplate(timeRanks, roomInfo, qid)
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
                    roomInfo && (
                        <div className={tab == 2 ? "mb-20" : "hidden"}>
                            <Background>
                                <RoomInfoBox
                                    title={roomInfo.title}
                                    date={`${getKoDateRange(roomInfo.dates)}`}
                                    participants={roomInfo.participants} />
                                <StickyButtonContainer>
                                    <FullButton
                                        style="secondary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("date/entry/약속정보: 초대하기")
                                            copyTextUrl(textUrl)
                                        }}
                                    >초대하기</FullButton>
                                </StickyButtonContainer>
                            </Background>
                        </div>
                    )

                }

            </TabLayout>
        </>
    )
}

export default Entry