/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */

import { Box, Center, Circle, Flex, Heading, HStack, Input, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'

import { Calendar, DateObject, getAllDatesInRange } from "react-multi-date-picker"
import type{Value} from "react-multi-date-picker"
import { ReactNode, useState } from 'react'
import { Button, ButtonGroup, ButtonTypeMap, ExtendButtonBase, TextField } from '@mui/material'
import ProcedureLayout from '../../components/Layout/ProcedureLayout'
import "react-multi-date-picker/styles/layouts/mobile.css"
import CenterFlexLayout from '../../components/Layout/CenterFlexLayout'
import axios from 'axios'
import { ConstructionOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'

const dateRangeFormat = "YYYY-MM-DD"
const timeRangeFormat = "HH:mm";
const googleTimeRangeFormat = "HH:mm:ss";

const MakeRoom: NextPage = () => {
    const router = useRouter()
    const { t } = useTranslation(['make-room', 'common'])

    const defaultTime: string[] = []
    
    const [dateRange, setDateRange] = useState<Value>([new Date()]);
    const [timeRange, setTimeRange] = useState(defaultTime)
    const [roomName, setRoomName] = useState("")

    const [checked, setChecked] = useState([false,false,false])

    const buttonText = [
        "아침 (7~12시)",
        "점심 (10~15시)",
        "저녁 (17~24시)"
    ]
    
    const buttonTimeRange = [
        ["07:00:00", "12:00:00"],
        ["10:00:00", "15:00:00"],
        ["17:00:00", "24:00:00"]
    ]
    
    const buttonMap: ReactNode = buttonText.map((e, idx) => {
        return (
            <Button
                className="md:text-lg text-xs"
                key={idx}
                variant={checked[idx] ? "contained" : "outlined"}
                onClick={() => {
                    setTimeRange(buttonTimeRange[idx])
                    
                    const tmpArr = [false, false, false]
                    tmpArr[idx] = true

                    setChecked(tmpArr)
                }}
            >{buttonText[idx]}</Button>

        )
    })


    return (
        <CenterFlexLayout>
            <Center mb="30">
                <p className="text-2xl font-bold">{t('common:make-room')}</p>
            </Center>

            <ProcedureLayout index={1} title={t('set-date')}>
                <Calendar className="rmdp-mobile" range value={dateRange}
                    onChange={(dateObjects) => {
                        if (dateObjects) {
                            // .map((date)=>{date.format()})
                            let tmpArr = getAllDatesInRange(dateObjects as DateObject[])
                            let newDate: string[] = []
                            tmpArr.map((date) => { newDate.push((date as DateObject).format(dateRangeFormat) ) })
                            setDateRange(newDate)
                        }
                      }}
                    zIndex={1} />
            </ProcedureLayout>

            <ProcedureLayout index={2} title={t('set-timezone')}>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    {buttonMap}
                </ButtonGroup>
                {/* <Center mt="10">
                    <h5>직접 설정</h5>
                </Center> */}
            </ProcedureLayout>

            <ProcedureLayout index={3} title={t('set-event-name')}>
                <HStack>
                    <TextField inputProps={{maxLength: 15}} value={roomName} onChange={(e) => { setRoomName(e.target.value) }} placeholder="약속명을 정해주세요" variant='standard'></TextField>
                    <Button
                        className="md:text-lg text-xs"
                        variant='outlined'
                        onClick={()=>{setRoomName(randomNameGenerator(router.query.locale as string))}}
                    >랜덤 생성</Button>
                </HStack>
            </ProcedureLayout>
            <Button
                className="md:text-lg text-xs"
                variant='outlined'
                onClick={sendRoomRequest}
            >방 생성하기</Button>
        </CenterFlexLayout>
    )

    function sendRoomRequest() {        // console.log(roomName, dateRange, timeRange)
        const srcUrl = process.env.NEXT_PUBLIC__API_URL + '/room'


        let sendFlag = (roomName != "") && (dateRange != undefined) && (timeRange != defaultTime)
        if (!sendFlag) {
            alert("날짜, 시간, 이름을 정확히 입력하세요")
        }
        else {
            axios({
                method: 'post',
                url: srcUrl,
                data: {
                    "title": roomName,
                    "dates": dateRange,
                    "startTime": timeRange[0],
                    "endTime": timeRange[1]
                }
            })
                .then((result) => {
                    // console.log(result.data.roomUuid)
                    router.push(`/${router.query.locale}/entry/${result.data.roomUuid}`);
                })
                .catch((e) => { console.log(e) })
        }
    }
}

const randomNameGenerator = (locale: string) => {
    const korean = ["우리 이때 만나요~", "그룹 약속", "우리 언제 만나?", "몇 시에 볼지 정해요"]
    const english = ["Let's meet then", "See you soon~", "When to meet?"]
    const tmpArr:string[] = []

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