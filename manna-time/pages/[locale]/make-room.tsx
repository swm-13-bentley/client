/* eslint-disable react/display-name */
import { Box, Center, Circle, Flex, Heading, HStack, Input, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import Layout from '../../components/Layout/Layout'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'

import { Calendar, DateObject } from "react-multi-date-picker"
import type{Value} from "react-multi-date-picker"
import { useState } from 'react'
import { Button, ButtonGroup, TextField } from '@mui/material'
import Navbar from '../../components/Layout/Navbar'
import ProcedureLayout from '../../components/Layout/ProcedureLayout'

const MakeRoom: NextPage = () => {
    const { t } = useTranslation(['make-room', 'common'])

    const [value, setValue] = useState<Value>(new Date());

    return (
        <Flex margin="150px auto 100px">
            {/* <Flex height="100vh" justifyContent="center"> */}

            <Flex direction="column" background="white" width="100%" rounded={6} maxW="690px" ml="20px" mr="20px">

                <ProcedureLayout index={1} title={t('set-date')}>
                    <Calendar multiple value={value} onChange={setValue} />
                </ProcedureLayout>

                <ProcedureLayout index={2} title={t('set-timezone')}>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button>아침(7~12)</Button>
                        <Button>점심(10~15)</Button>
                        <Button>저녁(17~24)</Button>
                    </ButtonGroup>
                    <Center mt="10">
                        <h5>직접 설정</h5>
                    </Center>
                </ProcedureLayout>

                <ProcedureLayout index={3} title={t('set-event-name')}>
                    <HStack>
                        <TextField label="약속명을 정해주세요" variant='standard'></TextField>
                        <Button variant='outlined'>랜덤 생성</Button>
                    </HStack>
                </ProcedureLayout>
                <Button variant='outlined'>약속 만들기</Button>
            </Flex>
        </Flex>
    )
}
export default MakeRoom

const getStaticProps = makeStaticProps(['make-room', 'common'])
export { getStaticPaths, getStaticProps }