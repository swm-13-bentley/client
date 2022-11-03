import axios from "axios"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import Scheduler from "@/components/Molecule/Scheduler/Scheduler"

import { MixpanelTracking } from "@/utils/sdk/mixpanel"

import { useRecoilState, useRecoilValue } from "recoil"
import { FeedbackState } from "@/src/state";

import copyTextUrl from "@/utils/copyTextUrl"
import TabLayout from "@/components/Layout/TabLayout"
import { Background } from "@/components/Layout/MainLayout/Wrapper"
import { BasicButtonContainer, StickyButtonContainer } from "@/components/Molecule/ButtonContainer"
import { FullButton } from "@/components/Atom/Button"
import RoomInfoBox from "@/components/Organism/RoomInfoBox"
import FilterAccordion from "@/components/Organism/FilterAccordion"
import { getKoDateRange } from "@/utils/changeFormat"
import Hours from "@/components/Molecule/Scheduler/Hours"
import { Body2 } from "@/components/Atom/Letter"
import UnknownParticipant from "@/components/Organism/UnknownParticipant"
import { isLoggedInState, tokenState } from "@/src/state/UserInfo"
import { CircularProgress } from "@mui/material"
import { ModalState } from "@/src/state/Modal"
import SubmitModal from "@/components/Organism/Modal/SubmitModal"
import { useToast } from "@chakra-ui/react"

const getParsedGroup = (data: object[], myName: string) => {
    let namesExceptMe: string[] = []

    let schedulesExceptMe: object[] = []
    let mySchedule: object = {}

    data.forEach(obj => {
        if (obj.participantName != myName) {
            schedulesExceptMe.push(obj)
        } else { mySchedule = obj }
    })

    schedulesExceptMe.forEach(obj => namesExceptMe.push(obj.participantName))
    return (
        {
            namesExceptMe: namesExceptMe,
            schedulesExceptMe: schedulesExceptMe,
            mySchedule: mySchedule
        }
    )
}

const Room: NextPage = function () {
    const toast = useToast({
        position: 'bottom',
        title: '로그인 실패',
        description: "access denied",
        status: 'error',
        duration: 1000,
        isClosable: true,
    })
    
    const [tab, setTab] = useState(0); // 0: 내 스케줄 , 1: 그룹 스케줄

    const router = useRouter()
    const { qid, name } = router.query

    const token = useRecoilValue(tokenState)
    const isLoggedIn = useRecoilValue(isLoggedInState)
    const [participantName, setParticipantName] = useState(name)

    let [roomInfo, setRoomInfo] = useState(null)
    let [loader, setLoader] = useState(true)
    
    //parsed Group Schedule
    let [groupSchedule, setGroupSchedule] = useState(null)
    let [groupNamesExceptMe, setGroupNamesExceptMe] = useState(null)
    let [mySchedule, setMySchedule] = useState(null)
    let [groupFilterChecked, setGroupFilterChecked] = useState(null)

    //calendar button
    const [isLoading, setIsLoading] = useState(false)
    const [calendarEvents, setCalendarEvents] = useState([])
    const [eventListenerCount, setEventListenerCount] = useState(0)

    const [submitSchedule, setSubmitSchedule] = useState()
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)

    let scheduleRef = useRef()

    const srcUrl = process.env.NEXT_PUBLIC_API_URL + '/room/' + qid
    const textUrl = process.env.NEXT_PUBLIC_SERVICE_URL + '/ko/entry/' + (qid as string) + '?invitation=true'

    useEffect(() => {
        setIsModalShown(false)
    },[])
    // 방 정보 가져오기 -> 추후에 props로 최적화할 것!
    useEffect(() => {
        if (qid != undefined) {
            axios.get(srcUrl)
                .then((result) => {
                    setRoomInfo(result.data);
                    if (result.data?.title !== undefined) { setLoader(false); };
                })
        }
    }, [srcUrl]);

    // 전체 스케줄 가져오기
    useEffect(() => {
        if (qid != undefined) {
            if (isLoggedIn) {
                axios.get(
                    `/api/user/time/${qid}/seperate`,
                    { headers: { token: `${token}`} }
                )
                    .then((result) => {
                        setParticipantName(result.data.myself.participantName)
                        setGroupSchedule(result.data.others)
                        setGroupNamesExceptMe(result.data.others.reduce((allNames, obj) => {
                            allNames.push(obj.participantName)
                            return allNames
                        },[]))
                        setMySchedule(result.data.myself)
                        setGroupFilterChecked(Array(result.data.others.length).fill(true))
                    })
            } else if (participantName != undefined) {
                axios.get(srcUrl + `/group/seperate/${participantName}`)
                    .then((result) => {
                        setGroupSchedule(result.data.others)
                        setGroupNamesExceptMe(result.data.others.reduce((allNames, obj) => {
                            allNames.push(obj.participantName)
                            return allNames
                        },[]))
                        setMySchedule(result.data.myself)
                        setGroupFilterChecked(Array(result.data.others.length).fill(true))
                    })
            }
        }
    }, [srcUrl, isLoggedIn]);

    // if (!isLoggedIn && participantName == undefined) {
    //     return (<UnknownParticipant url={`/ko/participant-login/${qid}`} />)
    // }

    const calendarAuthPopUp = (url: string) => {
        if (eventListenerCount == 0) {
            window.addEventListener("message", (event) => {
                // 캘린더 권한 동의했을 시 다시 캘린더 연동 진행
                if (event.data == 'fail')
                    toast()
                else if (event.data == 'success')
                    linkGoogleCalendar()
            }, false)
            setEventListenerCount(value=>value+1)
        }

        window.open(url, "self", 'popup')

    }

    return (
        <>
            <TabLayout
                value={tab}
                tabLabel={["내 일정", "약속 정보"]}
                onChange={setTab}
            >
                {
                    isModalShown && <SubmitModal isLoggedIn={isLoggedIn} dayOnly={false} schedule={submitSchedule}/>
                }
                {
                    roomInfo && groupNamesExceptMe && (
                        <div className={tab == 0 ? "mb-20" : "hidden"}>
                            <Scheduler
                                ref={scheduleRef}
                                mySchedule={mySchedule}
                                groupSchedule={groupSchedule}
                                isGroup={true}
                                roomInfo={roomInfo}
                                isDisabled={false}
                                groupFilterChecked={groupFilterChecked}
                                participantNames={groupNamesExceptMe}
                                hasComment={true}
                                calendarEvents={calendarEvents}
                            >
                                <div className="mb-5 mt-5">
                                    <FilterAccordion
                                        participantNames={groupNamesExceptMe}
                                        onChange={checked => setGroupFilterChecked(checked)}
                                        isChecked={null}
                                    />
                                </div>
                            </Scheduler>

                            <Background>

                                <BasicButtonContainer marginTop={"12"}>
                                    <FullButton style={"primary"}
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("room/내일정: 내 일정 등록하기")
                                            const mySchedule = scheduleRef.current.testFn()
                                            setSubmitSchedule(mySchedule)
                                            setIsModalShown(true)
                                            // submitMySchedule(mySchedule) 
                                        }}
                                    >내 일정 등록/수정하기</FullButton>
                                    <FullButton
                                        style="secondary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("room/내일정: 구글 캘린더 연동하기")
                                            if (!isLoading)
                                                linkGoogleCalendar()
                                        }}
                                    >{
                                            isLoading
                                                ?
                                                <CircularProgress style={{color: "#5194FF"}} color="inherit" size="30px"></CircularProgress>
                                                :
                                                '구글 캘린더 연동하기'
                                        }</FullButton>
                                </BasicButtonContainer>
                            </Background>

                        </div>
                    )
                }
                {
                    roomInfo && groupNamesExceptMe != undefined && (
                        <div className={tab == 1 ? "mb-20" : "hidden"}>
                            <Background>
                                <RoomInfoBox
                                    title={roomInfo.title}
                                    date={`${getKoDateRange(roomInfo.dates)}`}
                                    timeArea={`${Hours[roomInfo.startTime % 48].realTime} ~ ${Hours[roomInfo.endTime % 48].realTime}`}
                                    participants={groupNamesExceptMe} />
                                <StickyButtonContainer>
                                    <FullButton
                                        style="secondary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("room/약속정보: 초대하기")
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

    function linkGoogleCalendar() {
        if (isLoggedIn) {
            setIsLoading(true)
            axios.get(`/api/user/time/${qid}/calendar/schedule`,
                { headers: { token: `${token}` } }
            )
                .then((result) => {
                    setCalendarEvents(result.data.scheduleList)
                    setIsLoading(false)
                    alert("연동이 완료되었습니다. 해당 시간에 일정이 있는 경우 스케줄러에 표시되며, 약속 확정시 메일이 발송됩니다.")
                })
                .catch((e) => {
                    //권한 미동의 시 권한 변경하는 url 리턴받음
                    const authorityUrl = e.response.data
                    calendarAuthPopUp(authorityUrl)
                    setIsLoading(false)
                })
        } else {
            // 비로그인 처리
            router.push({
                pathname: '/ko/login',
                query: {
                    redirect: `/ko/user/enter-room?qid=${qid}&dayOnly=false`,
                    participantName: name,
                    roomUuid: qid
                }
            }, '/ko/login'
            )
        }
    }

}

export default Room