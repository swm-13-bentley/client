import axios from "axios"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import Scheduler from "@/components/Molecule/Scheduler/Scheduler"

import { MixpanelTracking } from "@/utils/sdk/mixpanel"

import { useRecoilState } from "recoil"
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
    const [tab, setTab] = useState(0); // 0: 내 스케줄 , 1: 그룹 스케줄

    const router = useRouter()
    const { qid, name } = router.query

    const [participantName, setParticipantName] = useState(name)

    let [roomInfo, setRoomInfo] = useState(null)
    let [loader, setLoader] = useState(true)
    let [groupButtonChecked, setGroupButtonChecked] = useState(true)
    
    //parsed Group Schedule
    let [groupSchedule, setGroupSchedule] = useState(null)
    let [groupNamesExceptMe, setGroupNamesExceptMe] = useState(null)
    let [mySchedule, setMySchedule] = useState(null)
    let [groupFilterChecked, setGroupFilterChecked] = useState(null)
    
    let scheduleRef = useRef()

    const srcUrl = process.env.NEXT_PUBLIC_API_URL + '/room/' + qid
    const textUrl = process.env.NEXT_PUBLIC_SERVICE_URL + '/ko/entry/' + (qid as string) + '?invitation=true'

    // 방 정보 가져오기 -> 추후에 props로 최적화할 것!
    useEffect(() => {
        axios.get(srcUrl)
            .then((result) => {
                setRoomInfo(result.data);
                if (result.data?.title !== undefined) { setLoader(false); };
            })
    }, [srcUrl]);

    // 전체 스케줄 가져오기
    useEffect(() => {
        axios.get(srcUrl + '/group')
            .then((result) => {
                let parsedGroup = getParsedGroup(result.data, participantName)

                setGroupSchedule(parsedGroup.schedulesExceptMe);
                setGroupNamesExceptMe(parsedGroup.namesExceptMe)
                setMySchedule(parsedGroup.mySchedule)
                setGroupFilterChecked(Array(parsedGroup.namesExceptMe.length).fill(true))
            })
    }, [srcUrl]);

    if (participantName == undefined) {
        return (<UnknownParticipant url={`/ko/participant-login/${qid}`} />)
    }

    return (
        <>
            <TabLayout
                value={tab}
                tabLabel={["내 일정", "약속 정보"]}
                onChange={setTab}
                >
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
                                    <FullButton style="primary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("room/내일정: 내 일정 등록하기")
                                            const mySchedule = scheduleRef.current.testFn()
                                            submitMySchedule(mySchedule)
                                        }}
                                    >내 일정 등록/수정하기</FullButton>
                                    {/* <FullButton
                                        style="secondary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("room/내일정: 캘린더 연동하기")
                                        }}
                                    >구글 캘린더 연동하기</FullButton> */}
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

    function submitMySchedule(props) {
        // console.log(props)
        axios({
            method: 'post',
            url: srcUrl + '/participant/available',
            data: {
                "participantName": participantName,
                "available": props
            }
        })
            .then((result) => {
                alert('일정이 등록되었습니다.')
                router.push(`/${router.query.locale}/entry/${qid}`);

            })
            .catch((e) => {
                // console.log(e.response)
                alert('일정등록이 실패하였습니다!')
            })

    }

    function postCalendarRequest() {
        const requestUrl = process.env.NEXT_PUBLIC_API_URL + `/google/calendar`
        axios({
            method: 'post',
            url: requestUrl
        })
            .then((result) => {
                // 구글 로그인 창 열기
                window.open(result.data.authUrl,"self",'popup')

            })
            .catch((e) => {
                console.log(e.response)
                alert('캘린더 요청 실패')
            })
    }

    function sendCalendarRequest(state: string, roomUuid: string) {
        const requestUrl = srcUrl + `/google/calendar`
        axios({
            method: 'get',
            url: requestUrl,
            data: {
                "roomUuid": roomUuid,
                "state" : state
            }
        })
            .then((result) => {
                console.log(result)

            })
            .catch((e) => {
                console.log(e.response)
                alert('캘린더 불러오기 실패')
            })
    }
}

export default Room