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

const MakeRoom = () => {
    const { t } = useTranslation(['make-room', 'common'])

    const [value, setValue] = useState<Value>(new Date());

    return (
        <Flex>
            {/* <Flex height="100vh" justifyContent="center"> */}
            <Flex margin="185px auto 150px">
                <Flex direction="column" background="white" width="100%" rounded={6} maxW="690px" ml="20px" mr="20px">
                    <Box mb="10">
                        <HStack cursor={"pointer"} onClick={()=>{}} width="100%">
                            <Circle size='40px' bg='tomato' color='white' mr="5">
                                <h1>1</h1>
                            </Circle>
                            <h1>{t('set-date')}</h1>
                        </HStack>
                        <Center mt="10">
                            <Calendar multiple value={value} onChange={setValue} />
                        </Center>
                    </Box>
                    <Box mb="10">
                        <HStack>
                            <Circle size='40px' bg='tomato' color='white' mr="5">
                                <h1>2</h1>
                            </Circle>
                            <h1>{t('set-timezone')}</h1>
                        </HStack>
                        <Center mt="10">
                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                                <Button>아침(7~12)</Button>
                                <Button>점심(10~15)</Button>
                                <Button>저녁(17~24)</Button>
                            </ButtonGroup> 
                        </Center> 
                        <Center mt="10">
                            <h5>직접 설정</h5>
                        </Center>
                    </Box>
                    <Box mb="10">
                        <HStack>
                            <Circle size='40px' bg='tomato' color='white' mr="5">
                                <h1>3</h1>
                            </Circle>
                            <h1>{t('set-event-name')}</h1>
                        </HStack>
                        <Center mt="10">
                            <HStack>
                                <TextField label="약속명을 정해주세요" variant='standard'></TextField>
                                <Button variant='outlined'>랜덤 생성</Button>
                            </HStack>
                        </Center>
                    </Box>
                    <Button variant='outlined'>약속 만들기</Button>
                    
                    
                </Flex>
            </Flex>
            {/* </Flex> */}
        </Flex>
    )
}
export default MakeRoom

const getStaticProps = makeStaticProps(['make-room', 'common'])
export { getStaticPaths, getStaticProps }