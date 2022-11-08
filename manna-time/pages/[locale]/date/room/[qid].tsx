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
import { Center } from "@chakra-ui/react"
import { Calendar, DateObject } from "react-multi-date-picker"
import { DateCriteria, getFilteredSchedule } from "@/utils/date/convertGroup"
import { ScreenLockRotationRounded } from "@mui/icons-material"
import styled from "@emotion/styled"
import { isLoggedInState, tokenState } from "@/src/state/UserInfo"
import "react-multi-date-picker/styles/layouts/mobile.css"
import { months, weekDays } from "@/utils/dateFormat"


const dateRangeFormat = "YYYY-MM-DD"

const StyledP = styled.p`
    font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 160%;
/* or 19px */

text-align: center;
letter-spacing: -0.003em;

color: #5194FF;
`

const Room: NextPage = function () {
    const [tab, setTab] = useState(0); // 0: 내 스케줄 , 1: 그룹 스케줄

    const router = useRouter()
    const { qid, name } = router.query

    const token = useRecoilValue(tokenState)
    const isLoggedIn = useRecoilValue(isLoggedInState)
    const [participantName, setParticipantName] = useState(name)

    let [roomInfo, setRoomInfo] = useState(null)

    let [groupSchedule, setGroupSchedule] = useState(null)
    let [groupNamesExceptMe, setGroupNamesExceptMe] = useState(null)
    const [selectedDates, setSelectedDates] = useState<string[]>([])
    let [groupFilterChecked, setGroupFilterChecked] = useState(null)
    const [filteredSchedule, setFilteredSchedule] = useState<DateCriteria | null>(null)
    let scheduleRef = useRef()

    let srcUrl = process.env.NEXT_PUBLIC_API_URL + '/day/room/' + qid
    let textUrl = process.env.NEXT_PUBLIC_SERVICE_URL + '/ko/date/entry/' + qid + '?invitation=true'

    useEffect(() => {
        axios.get(srcUrl)
            .then((result) => {
                const namesExceptMe = result.data.participants.filter((name: string) => { return name != participantName })
                setGroupFilterChecked(Array(result.data.participants.length - 1).fill(true))
                setGroupNamesExceptMe(namesExceptMe)
                setRoomInfo(result.data);
            })
    }, [srcUrl]);

    // 전체 스케줄 가져오기
    useEffect(() => {
        if (qid != undefined) {
            if (isLoggedIn) {
                axios.get(
                    `/api/user/date/${qid}/seperate`,
                    { headers: { token: `${token}`} }
                )
                    .then((result) => {
                        setParticipantName(result.data.myself.participantName)
                        setGroupSchedule(result.data.others)
                        setGroupNamesExceptMe(result.data.others.reduce((allNames, obj) => {
                            allNames.push(obj.participantName)
                            return allNames
                        }, []))
                        setSelectedDates(result.data.myself.availableDates)
                        setGroupFilterChecked(Array(result.data.others.length).fill(true))
                    })
            } else if (participantName != undefined) {
                axios.get(srcUrl + `/group/seperate/${participantName}`)
                    .then((result) => {
                        setSelectedDates(result.data.myself.availableDates)
                        setGroupSchedule(result.data.others)
                        setGroupNamesExceptMe(result.data.others.reduce((allNames, obj) => {
                            allNames.push(obj.participantName)
                            return allNames
                        },[]))
                        setGroupFilterChecked(Array(result.data.others.length).fill(true))
                    })
                    .catch((e)=> {console.log(e)})
            }
        }
    }, [srcUrl, isLoggedIn]);

    useEffect(() => {
        if (groupSchedule != null && roomInfo != undefined && groupFilterChecked != null)
            setFilteredSchedule(getFilteredSchedule(groupSchedule, groupNamesExceptMe, groupFilterChecked))
    }, [groupFilterChecked, groupSchedule])

    return (
        <>
            <TabLayout
                value={tab}
                tabLabel={["내 일정", "약속 정보"]}
                onChange={setTab}
            >
                {
                    roomInfo && groupNamesExceptMe && filteredSchedule && (
                        <div className={tab == 0 ? "mb-20" : "hidden"}>
                            <Background>
                                <Center mt="12px">
                                    <FilterAccordion
                                        participantNames={groupNamesExceptMe}
                                        onChange={checked => setGroupFilterChecked(checked)}
                                        isChecked={null}
                                    />
                                </Center>
                                <Center mt="20px" mb="12px">
                                    <Calendar className="rmdp-mobile"
                                        currentDate={new DateObject(roomInfo.dates[0])}
                                        months={months}
                                        weekDays={weekDays}
                                        multiple
                                        value={selectedDates}
                                        onChange={(dateObjects: DateObject[]) => {
                                            let selected = dateObjects.map(date => date.format(dateRangeFormat))
                                            setSelectedDates(selected)
                                        }}
                                        mapDays={({ date, selectedDate, isSameDate }) => {
                                            const formattedDate = date.format(dateRangeFormat)
                                            let isDateRange = roomInfo.dates.includes(formattedDate)
                                            
                                            if (isDateRange) {
                                                let props = { className: "", disabled: false, style: {} }
                                                let opacity = 0
                                                let color = "#333333"
                                                let border = "none"
                                                let backgroundColor = "#ffffff"

                                                let isSunday = (0 == date.weekDay.index)
                                                let isSaturday = (6 == date.weekDay.index)

                                                if (isSunday) color = "#cc0303"
                                                if (isSaturday) {
                                                    color= "#0074D9"
                                                }
                                                
                                                const flag = (selectedDates.filter((d) => { return isSameDate(date, new DateObject(d)) }).length > 0)
                                                if (flag) {
                                                    backgroundColor = "#ffffff"
                                                    border = "3px solid #00D8F8"
                                                }
                                                if (filteredSchedule[formattedDate] && roomInfo.participants.length > 1) {
                                                    opacity = filteredSchedule[formattedDate].length / (roomInfo.participants.length - 1)
                                                    color = "#ffffff"
                                                    backgroundColor = `rgba(0, 86, 224, ${opacity})`
                                                }
                                                
                                                props.style = {
                                                    backgroundColor: backgroundColor,
                                                    color: color,
                                                    border: border
                                                }
                                                // let isWeekend = [0, 6].includes(date.weekDay.index)
                                                
                                                
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
                                    <StyledP>약속 가능한 날짜들을 선택해주세요</StyledP>
                            </Background>

                            <Background>
                                <BasicButtonContainer marginTop={"10"}>
                                    <FullButton style="primary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("date/room/내일정: 내 일정 등록하기")
                                            submitMySchedule(selectedDates)
                                        }}
                                    >내 일정 등록/수정하기</FullButton>
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
                                    participants={roomInfo.participants} />
                                <StickyButtonContainer>
                                    <FullButton
                                        style="secondary"
                                        onClick={() => {
                                            MixpanelTracking.getInstance().buttonClicked("date/room/약속정보: 초대하기")
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

    function submitMySchedule(mySchedule: string[]) {
        axios({
            method: 'post',
            url: srcUrl + '/participant/available',
            data: {
                "participantName": participantName,
                "availableDates": mySchedule
            }
        })
            .then((result) => {
                alert('일정이 등록되었습니다.')
                router.push(`/${router.query.locale}/date/entry/${qid}`);

            })
            .catch((e) => {
                // console.log(e.response)
                alert('일정등록이 실패하였습니다! 관리자에게 문의하세요')
            })

    }

}

export default Room