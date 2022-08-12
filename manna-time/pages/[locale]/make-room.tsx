/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */

import { Box, Center, Circle, Collapse, Flex, Heading, HStack, Input, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'

import { Calendar, DateObject, getAllDatesInRange } from "react-multi-date-picker"
import type { Value } from "react-multi-date-picker"
import { ReactNode, useState } from 'react'
import { Button, ButtonGroup, ButtonTypeMap, Checkbox, ExtendButtonBase, FormControlLabel, TextField } from '@mui/material'
import ProcedureLayout from '../../components/Layout/ProcedureLayout'
import "react-multi-date-picker/styles/layouts/mobile.css"
import CenterFlexLayout from '../../components/Layout/CenterFlexLayout'
import axios from 'axios'
import { ConstructionOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { MixpanelTracking } from '@/utils/mixpanel'
import TimeRangeSelectbox from '@/components/Molecule/TimeRangeSelectbox/TimeRangeSelectbox'

const dateRangeFormat = "YYYY-MM-DD"
const timeRangeFormat = "HH:mm";
const googleTimeRangeFormat = "HH:mm:ss";

const MakeRoom: NextPage = () => {
    const router = useRouter()
    const { t } = useTranslation(['make-room', 'common'])

    const defaultTime: string[] = []

    const [dateRange, setDateRange] = useState([new Date()]);
    const [isDateOnly, setIsDateOnly] = useState(false)
    const [timeRange, setTimeRange] = useState(defaultTime)
    const [manualTimeRange, setManualTimeRange] = useState(["", ""])
    const [manualClicked, setManualClicked] = useState(false)
    const [roomName, setRoomName] = useState("")

    const [checked, setChecked] = useState([false, false, false])

    const buttonText = [
        ["아침", "(7~12시)"],
        ["점심", "(10~15시)"],
        ["저녁", "(17~24시)"],
        ["전체", "(9~24시)"]

    ]

    const buttonTimeRange = [
        ["07:00:00", "12:00:00"],
        ["10:00:00", "15:00:00"],
        ["17:00:00", "24:00:00"],
        ["09:00:00", "24:00:00"]
    ]

    const buttonMap: ReactNode = buttonText.map((e, idx) => {
        return (
            <Button
                className="md:text-lg text-xs"
                key={idx}
                sx={{ borderColor: "#757ce8", display: "inline" }}
                variant={checked[idx] ? "contained" : "outlined"}
                onClick={() => {
                    setTimeRange(buttonTimeRange[idx])

                    const tmpArr = [false, false, false]
                    tmpArr[idx] = true

                    setChecked(tmpArr)
                }}
            >{buttonText[idx][0]}<br />{buttonText[idx][1]}</Button>

        )
    })


    return (
        <CenterFlexLayout>
            <Center mb="30" width="100%">
                <h1 className="text-2xl font-semibold">{t('common:make-room')}</h1>
            </Center>

            <ProcedureLayout index={1} title={t('set-date')}>
                <Calendar className="rmdp-mobile" range value={dateRange}
                    showOtherDays
                    onChange={(dateObjects) => {
                        if (dateObjects) {
                            let tmpArr = getAllDatesInRange(dateObjects as DateObject[])
                            let newDate: string[] = []
                            tmpArr.map((date) => { newDate.push((date as DateObject).format(dateRangeFormat)) })
                            setDateRange(newDate)
                        }
                    }}
                    zIndex={1} />
                <FormControlLabel
                    className="md:text-md text-lg mt-2"
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 25 } }}
                    label={"약속 날짜만 정하면 돼요"}
                    control={
                        <Checkbox
                            checked={isDateOnly}
                            onChange={() => setIsDateOnly(!isDateOnly)}
                        />
                    }
                />
            </ProcedureLayout>
            <Box height={isDateOnly ? 0 : "100%"} width="100%" overflow={"hidden"} transition="height 500ms ease">
                <ProcedureLayout index={2} title={t('set-timezone')}>
                    <Box width="100%" opacity={manualClicked ? 0.5 : 1} onClick={() => setManualClicked(false)} mb={15}>
                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                            {buttonMap}
                        </ButtonGroup>
                    </Box>
                    <Box width="100%" opacity={manualClicked ? 1 : 0.5} onClick={() => setManualClicked(true)}>
                        <TimeRangeSelectbox
                            onSelectChange={(selected) => {
                                setManualTimeRange(selected)
                                setManualClicked(true)
                            }}
                        />
                    </Box>

                </ProcedureLayout>
            </Box>

            <ProcedureLayout index={isDateOnly ? 2 : 3} title={t('set-event-name')}>
                <HStack>
                    <TextField inputProps={{ maxLength: 15 }} value={roomName} onChange={(e) => { setRoomName(e.target.value) }} placeholder="방 제목" variant='standard'></TextField>
                    <Button
                        className="md:text-lg text-sm"
                        variant='outlined'
                        sx={{ borderColor: "#757ce8" }}
                        onClick={() => { setRoomName(randomNameGenerator(router.query.locale as string)) }}
                    >자동 생성</Button>
                </HStack>
            </ProcedureLayout>
            <Button
                className="md:text-lg text-lg"
                variant='contained'
                sx={{ backgroundColor: "#757ce8" }}
                onClick={() => {
                    sendRoomRequest()
                    MixpanelTracking.getInstance().buttonClicked("make-room: 방 만들기")
                }}
            >방 생성하기</Button>
        </CenterFlexLayout>
    )

    function sendRoomRequest() {
        let srcUrl,sendFlag
        if (isDateOnly) {
            //날짜만 정하는 방
            srcUrl = process.env.NEXT_PUBLIC_API_URL + '/day/room'
            sendFlag = (roomName != "" && dateRange.length > 0)
            if (!sendFlag)
                alert("날짜, 방 제목을 정확히 입력하세요")
            else {
                axios({
                    method: 'post',
                    url: srcUrl,
                    data: {
                        "title": roomName,
                        "dates": dateRange
                    }
                })
                    .then((result) => {
                        console.log(result.data.roomUuid)
                        router.push(`/${router.query.locale}/date/${result.data.roomUuid}`);
                    })
                    .catch((e) => {
                        // console.log(e)
                        alert("네트워크 오류가 발생했습니다. 관리자에게 문의하세요.")
                    })
            }
        } else {
            //시간대까지 정하는 방
            let srcUrl = process.env.NEXT_PUBLIC_API_URL + '/room'
            let requestTimeRange = manualClicked ? manualTimeRange : timeRange
            sendFlag = (roomName != "") && (requestTimeRange.length != 0 && requestTimeRange.every((time) => time.length > 0))
    
            if (!sendFlag) {
                alert("날짜, 시간, 방 제목을 정확히 입력하세요")
            }
            else if (requestTimeRange[0] == requestTimeRange[1]) {
                alert("시작 시간과 끝 시간은 같을 수 없습니다. 시간을 수정해주세요")
            }
            else {
                axios({
                    method: 'post',
                    url: srcUrl,
                    data: {
                        "title": roomName,
                        "dates": dateRange,
                        "startTime": requestTimeRange[0],
                        "endTime": requestTimeRange[1]
                    }
                })
                    .then((result) => {
                        // console.log(result.data.roomUuid)
                        router.push(`/${router.query.locale}/entry/${result.data.roomUuid}`);
                    })
                    .catch((e) => {
                        // console.log(e)
                        alert("네트워크 오류가 발생했습니다. 관리자에게 문의하세요.")
                    })
            }
        }

    }
}

const randomNameGenerator = (locale: string) => {
    const korean = ["우리 이때 만나요~", "그룹 약속", "우리 언제 만나?", "몇 시에 볼지 정해요", "약속 시간 정해요!"]
    const english = ["Let's meet then", "See you soon~", "When to meet?"]
    const tmpArr: string[] = []

    const randomNum = Math.ceil((Math.random()) * 10)
    if (locale == "ko") {
        return korean[randomNum % korean.length];
    } else {
        return english[randomNum % english.length];
    }
}


export default MakeRoom

const getStaticProps = makeStaticProps(['make-room', 'common'])
export { getStaticPaths, getStaticProps }