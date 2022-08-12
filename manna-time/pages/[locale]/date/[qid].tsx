import { useRouter } from "next/router"
import CenterFlexLayout from "@/components/Layout/CenterFlexLayout"
import TimeRank from "@/components/Molecule/Rank/TimeRank"
import { Center } from "@chakra-ui/react"
import { Button, Paper } from "@mui/material"
import { NextPage } from "next"
import { Calendar } from "react-multi-date-picker"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { MixpanelTracking } from "@/utils/mixpanel"
import copyTextUrl from "@/utils/copyTextUrl"
import PublishIcon from '@mui/icons-material/Publish';
import { useEffect, useState } from "react"
import axios from "axios"

const dateRangeFormat = "YYYY-MM-DD"

interface RoomInfo {
    title: string,
    dates: string[]
}

const Date: NextPage = function () {
    const router = useRouter()
    const { qid } = router.query

    const apiUrl = process.env.NEXT_PUBLIC_API_URL + '/day/room/' + qid
    const textUrl = process.env.NEXT_PUBLIC_SERVICE_URL + (router.asPath as string)

    const [roomInfo, setRoomInfo] = useState<RoomInfo>()
    const [loader, setLoader] = useState(true)
    const [selectedDates, setSelectedDates] = useState([])

    useEffect(() => {
        axios.get(apiUrl)
            .then((result) => {
                setRoomInfo(result.data)
            })
    }, [apiUrl]);

    return (<>
        <CenterFlexLayout>
            {
                !roomInfo ? <h1>방 정보를 불러오는 중입니다...</h1> :
                    <>
                        <Center mb="5">
                            <p className="text-lg font-bold">{roomInfo.title}</p>
                        </Center>
                        <Center mb="5">
                            <p className="text-sm font-bold">{roomInfo.dates[0]} ~ {roomInfo.dates[roomInfo.dates.length - 1]}</p>
                        </Center>

                        <Center width={"100%"}>
                            <TimeRank />
                        </Center>
                        <Center>
                            <Calendar className="rmdp-mobile"
                                multiple
                                onChange={(dateObjects) => {
                                    // if (dateObjects) {
                                    //     let tmpArr = getAllDatesInRange(dateObjects as DateObject[])
                                    //     let newDate: string[] = []
                                    //     tmpArr.map((date) => { newDate.push((date as DateObject).format(dateRangeFormat)) })
                                    //     setDateRange(newDate)
                                    // }
                                }}
                                mapDays={({ date }) => {
                                    let isDateRange = roomInfo.dates.includes(date.format(dateRangeFormat))

                                    if (isDateRange) return {
                                        disabled: false,
                                        // onClick: () => alert("weekends are disabled")
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
                                className="mr-5"
                                variant="contained"
                                startIcon={<ContentCopyIcon />}
                                onClick={() => {
                                    MixpanelTracking.getInstance().buttonClicked("room/date: 링크 복사")
                                    copyTextUrl(textUrl)
                                }}
                            >
                                방 링크 복사
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<PublishIcon />}

                            // onClick={(e: React.SyntheticEvent) => {
                            //     setExpanded(false)
                            //     MixpanelTracking.getInstance().buttonClicked("entry: 내 시간 입력(아코디언 접기)")
                            // }}
                            >
                                날짜 제출하기
                            </Button>
                        </Center>
                    </>
            }


        </CenterFlexLayout>
    </>)
}

export default Date