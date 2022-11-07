import { useRouter } from "next/router"
import CenterFlexLayout from "@/components/Layout/CenterFlexLayout"
import { Center, useToast } from "@chakra-ui/react"
import { Button, Paper } from "@mui/material"
import { NextPage } from "next"
import { Calendar, DateObject } from "react-multi-date-picker"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { MixpanelTracking } from "@/utils/sdk/mixpanel"
import copyTextUrl from "@/utils/copyTextUrl"
import PublishIcon from '@mui/icons-material/Publish';
import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from "react"
import axios from "axios"
import DateRank from "@/components/Molecule/Rank/DateRank"
import { useRecoilState } from "recoil"
import { DateOnlyLoginState } from "@/src/state"
import DateOnlyCard from "@/components/Atom/ModalCard/DateOnlyCard"
import { resolveHref } from "next/dist/shared/lib/router/router"
import "react-multi-date-picker/styles/layouts/mobile.css"


const dateRangeFormat = "YYYY-MM-DD"

interface RoomInfo {
    title: string,
    dates: string[],
    participants: string[]
}

interface Rank {
    availableDate: string,
    participants: string[]
}

const Date: NextPage = function () {
    const router = useRouter()
    const { qid } = router.query

    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/day/room/' + qid
    const textUrl = process.env.NEXT_PUBLIC_SERVICE_URL + (router.asPath as string)

    const [roomInfo, setRoomInfo] = useState<RoomInfo>()
    const [selectedDates, setSelectedDates] = useState<string[]>([])
    const [dateRanks, setDateRanks] = useState<Rank[]>([])

    const [isLoginShown, setIsLoginShown] = useRecoilState(DateOnlyLoginState)
    const [loginType, setLoginType] = useState("")

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [submitCount, setSubmitCount] = useState(0)

    const toast = useToast({
        position: 'top',
        title: '제출이 완료되었습니다!',
        description: "투표 결과를 확인하세요",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })

    useEffect(() => {
        if (qid != undefined) {
            axios.get(apiUrl)
                .then((result) => {
                    setRoomInfo(result.data)
                })
        }
    }, [isLoginShown, qid, submitCount]);

    useEffect(() => {
        if (qid != undefined) {
            axios.get(apiUrl + '/top/5')
                .then((result) => {
                    setDateRanks(result.data)
                })
        }
    }, [isLoginShown, qid, submitCount]);

    return (<>
        {isLoginShown &&
            <DateOnlyCard
            onConfirm={(name, password?) => {
                let promise
                if (loginType == "제출하기") {
                    promise = submitDates(apiUrl + '/participant/available', selectedDates, name, password)
                    promise.then((result) => {
                        if (result != undefined) {
                            setName(name)
                            setPassword(password != undefined ? password : "")
                            toast()
                        }
                    })
                    return ({
                        promise: promise,
                        errorText: "이전에 입력하신 비밀번호를 입력해주세요!"
                    })
                } else {
                    // "이전입력" 불러오기의 경우
                    promise = loadDates(apiUrl + '/participant/load', name, password)
                    promise.then((result) => {
                        if (result != undefined) {
                            setSelectedDates(result.data.availableDates)
                            setName(name)
                            setPassword(password!=undefined ? password : "")
                        }
                    })
                    return ({
                        promise: promise,
                        errorText: "존재하지 않는 사용자입니다"
                    })
                }
                }}

            />}
        <CenterFlexLayout>
            {
                !roomInfo ? <h1>방 정보를 불러오는 중입니다...</h1> :
                    <>
                        <Center mb="5">
                            <h1 className="text-lg font-bold">{roomInfo.title}</h1>
                        </Center>
                        <Center mb="2">
                            <p className="text-sm font-bold">{roomInfo.dates[0]} ~ {roomInfo.dates[roomInfo.dates.length - 1]}</p>
                        </Center>
                        <Center >
                            <p className="text-sm font-bold">현재 참여자 : {roomInfo.participants.join(', ')}</p>
                        </Center>

                        <Center width={"100%"}>
                            <DateRank
                                ranks={dateRanks}
                                totalNum={roomInfo.participants.length}
                            />
                        </Center>
                        <Paper sx={{ boxShadow: 3, padding: 3, maxWidth: 693, minWidth: "100%", borderRadius: 3 }}>
                            <Center className="mb-3 ml-4 mr-4">
                                <p className="md:text-lg text-base font-bold ">
                                    약속
                                    <span className="md:text-lg text-base font-bold text-blue-700">{" 가능한 날짜"}</span>
                                    를 선택하세요
                                </p>
                            </Center >
                            <Center>
                                <Calendar className="rmdp-mobile"
                                    multiple
                                    showOtherDays
                                    value={
                                        // ["2022-08-20", "2022-08-22"]
                                        selectedDates
                                    }
                                    onChange={(dateObjects: DateObject[]) => {
                                        let selected = dateObjects.map(date => date.format(dateRangeFormat))
                                        setSelectedDates(selected)
                                    }}
                                    mapDays={({ date }) => {
                                        let isDateRange = roomInfo.dates.includes(date.format(dateRangeFormat))
                                        
                                        if (isDateRange) {
                                            let props = {className:"", disabled: false}
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
                            <Center className=" mt-5">
                                <Button
                                    fullWidth
                                    className="mr-2"
                                    variant="contained"
                                    startIcon={<DownloadIcon />}
                                    onClick={() => {
                                        setLoginType("이전입력")
                                        setIsLoginShown(true)
                                        MixpanelTracking.getInstance().buttonClicked("date: 이전 입력 불러오기")
                                    }}
                                >
                                    이전 입력
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<PublishIcon />}

                                    onClick={(e: React.SyntheticEvent) => {
                                        if (name == "") {
                                            setLoginType("제출하기")
                                            setIsLoginShown(true)
                                        } else {
                                            const promise = submitDates(apiUrl + '/participant/available', selectedDates, name, password)
                                            promise.then(() => {
                                                setSubmitCount(prev => prev + 1)
                                            })
                                            toast()
                                        }
                                        MixpanelTracking.getInstance().buttonClicked("date: 날짜 제출하기")
                                    }}
                                >
                                    제출하기
                                </Button>
                            </Center>
                            <Center className="mt-3">
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<ContentCopyIcon />}
                                    onClick={() => {
                                        MixpanelTracking.getInstance().buttonClicked("date: 링크 복사")
                                        copyTextUrl(textUrl)
                                    }}
                                >
                                    방 링크 복사
                                </Button>
                            </Center>
                        </Paper>


                    </>
            }


        </CenterFlexLayout>
    </>)

}

async function submitDates(apiUrl: string, dates: string[], name: string, password?: string) {
    let sendPassword = password != undefined ? password : ""
    if (name == "") {
        alert("이름을 입력해주세요")
        return
    } else {
        return await axios({
            method: 'post',
            url: apiUrl,
            data: {
                'participantName': name,
                'password': sendPassword,
                'availableDates': dates
            }
        }).then((result) => { return result })
    }
}

async function loadDates(apiUrl: string, name: string, password?: string) {
    let sendPassword = password != undefined ? password : ""
    if (name == "") {
        alert("이름을 입력해주세요")
        return
    } else {
        return await axios({
            method: 'post',
            url: apiUrl,
            data: {
                'participantName': name,
                'password': sendPassword,
            }
        }).then((result) => { return result })
    }
}

export default Date