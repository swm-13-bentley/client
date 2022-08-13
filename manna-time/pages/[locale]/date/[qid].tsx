import { useRouter } from "next/router"
import CenterFlexLayout from "@/components/Layout/CenterFlexLayout"
import { Center } from "@chakra-ui/react"
import { Button, Paper } from "@mui/material"
import { NextPage } from "next"
import { Calendar, DateObject } from "react-multi-date-picker"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { MixpanelTracking } from "@/utils/mixpanel"
import copyTextUrl from "@/utils/copyTextUrl"
import PublishIcon from '@mui/icons-material/Publish';
import DownloadIcon from '@mui/icons-material/Download';
import { useEffect, useState } from "react"
import axios from "axios"
import DateRank from "@/components/Molecule/Rank/DateRank"

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

// type Props = {
//     ranks?: Rank[],
//     totalNum: number
// }

const Date: NextPage = function () {
    const router = useRouter()
    const { qid } = router.query

    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/day/room/' + qid
    const textUrl = process.env.NEXT_PUBLIC_SERVICE_URL + (router.asPath as string)

    const [roomInfo, setRoomInfo] = useState<RoomInfo>()
    const [selectedDates, setSelectedDates] = useState<string[]>([])
    const [dateRanks, setDateRanks] = useState<Rank[]>([])

    useEffect(() => {
        if (qid != undefined) {
            axios.get(apiUrl)
                .then((result) => {
                    setRoomInfo(result.data)
                })
        }
    }, [qid]);

    useEffect(() => {
        if (qid != undefined) {
            axios.get(apiUrl + '/top/5')
                .then((result) => {
                    setDateRanks(result.data)
                })
        }
    }, [qid]);

    return (<>
        <CenterFlexLayout>
            {
                !roomInfo ? <h1>방 정보를 불러오는 중입니다...</h1> :
                    <>
                            <Center mb="5">
                                <h1 className="text-lg font-bold">{roomInfo.title}</h1>
                            </Center>
                            <Center >
                                <p className="text-sm font-bold">{roomInfo.dates[0]} ~ {roomInfo.dates[roomInfo.dates.length - 1]}</p>
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

                                        if (isDateRange) return {
                                            disabled: false,
                                        }
                                        else return {
                                            disabled: true,
                                            style: { color: "#ccc" },
                                        }
                                    }}
                                    zIndex={1} />
                            </Center>
                            <Center className=" mt-5">
                                <Button
                                    fullWidth
                                    className="mr-2"
                                    variant="contained"
                                    startIcon={<DownloadIcon />}
                                // onClick={() => {
                                //     MixpanelTracking.getInstance().buttonClicked("date: 링크 복사")
                                //     copyTextUrl(textUrl)
                                // }}
                                >
                                    이전 입력
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    startIcon={<PublishIcon />}

                                    onClick={(e: React.SyntheticEvent) => {
                                        submitDates(apiUrl + '/participant/available', selectedDates)
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

// function sendLoginRequest (apiUrl: string):Boolean {
//     const participantName = "Tom"
//     const password = "12345"

//     axios({
//         method: 'post',
//         url: apiUrl,
//         data: {
//             'participantName': participantName,
//             'password': password,
//         }
//     })
//         .then((result) => {
//             console.log(result)
//             return true
//         })
//         .catch((e) => {
//             console.log(e)
//             return false
//         })
// }

function submitDates(apiUrl: string, dates: string[]) {
    const participantName = "Tom"
    const password = "12345"

    axios({
        method: 'post',
        url: apiUrl,
        data: {
            'participantName': participantName,
            'password': password,
            'availableDates': dates
        }
    })
        .then((result) => {
            console.log(result)
        })
        .catch((e) => {
            console.log(e)
        })
}

export default Date