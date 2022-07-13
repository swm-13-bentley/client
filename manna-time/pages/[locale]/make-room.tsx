/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */

import { Box, Center, Circle, Flex, Heading, HStack, Input, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'

import { Calendar, DateObject } from "react-multi-date-picker"
import type{Value} from "react-multi-date-picker"
import { ReactNode, useState } from 'react'
import { Button, ButtonGroup, ButtonTypeMap, ExtendButtonBase, TextField } from '@mui/material'
import ProcedureLayout from '../../components/Layout/ProcedureLayout/ProcedureLayout'
import "react-multi-date-picker/styles/layouts/mobile.css"


const MakeRoom: NextPage = () => {
    const { t } = useTranslation(['make-room', 'common'])

    const defaultTime: string[] = []
    
    const [dateRange, setDateRange] = useState<Value>(new Date());
    const [timeRange, setTimeRange] = useState(defaultTime)
    const [roomName, setRoomName] = useState("")

    const [checked, setChecked] = useState([false,false,false])

    const buttonText = [
        "아침(7~12시)",
        "점심(10~15시)",
        "저녁(17~24시)"
    ]
    
    const buttonTimeRange = [
        ["07:00:00", "12:00:00"],
        ["10:00:00", "15:00:00"],
        ["17:00:00", "24:00:00"]
    ]
    
    const buttonMap: ReactNode = buttonText.map((e, idx) => {
        return (
            <Button
                key={idx}
                sx={{backgroundColor:'orange'}}
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
        <Flex margin="50px auto 30px">
            {/* <Flex height="100vh" justifyContent="center"> */}

            <Flex direction="column" background="white" width="100%" rounded={6} maxW="690px" ml="20px" mr="20px">

                <Center mb="30">
                    <p className="text-2xl font-bold">{t('common:make-room')}</p>
                </Center>
                <ProcedureLayout index={1} title={t('set-date')}>
                    <Calendar className="rmdp-mobile" range value={dateRange} onChange={setDateRange} zIndex={1} />
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
                        <Button variant='outlined'
                            onClick={()=>{setRoomName(randomNameGenerator)}}
                        >랜덤 생성</Button>
                    </HStack>
                </ProcedureLayout>
                <Button variant='outlined'>방 생성하기</Button>
            </Flex>
        </Flex>
    )
}

const randomNameGenerator = function () {
    return Math.random().toString(36).substring(2, 12);
}


export default MakeRoom

const getStaticProps = makeStaticProps(['make-room', 'common'])
export { getStaticPaths, getStaticProps }