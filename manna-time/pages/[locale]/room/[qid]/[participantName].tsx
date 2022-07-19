import { Center, HStack } from "@chakra-ui/react"
import { Box, Button, Checkbox, CssBaseline, FormControlLabel, FormGroup, Paper, Tab, Tabs, ToggleButton } from "@mui/material"
import axios from "axios"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import CenterFlexLayout from "../../../../components/Layout/CenterFlexLayout"
import ParticipantLogin from "../../../../components/ParticipantLogin"
import Scheduler from "../../../../components/Scheduler/Scheduler"
import '/styles/test.module.css'

import LinkIcon from '@mui/icons-material/Link'


const Room: NextPage = function () {
    const [tab, setTab] = useState(0); // 0: 내 스케줄 , 1: 그룹 스케줄

    const router = useRouter()
    // console.log(router)
    const { qid, participantName } = router.query
    // console.log(qid)

    let [roomInfo, setRoomInfo] = useState(null)
    let [loader, setLoader] = useState(true)
    let [groupSchedule, setGroupSchedule] = useState(null)

    let scheduleRef = useRef()

    let srcUrl = process.env.NEXT_PUBLIC__API_URL + '/room/' + qid

    // 방 정보 가져오기 -> 추후에 props로 최적화할 것!
    useEffect(() => {
        axios.get(srcUrl)
            .then((result) => {
                // console.log(result.data);
                setRoomInfo(result.data);
                if (result.data?.title !== undefined) { setLoader(false); };
            })
    }, [qid]);

    // 전체 스케줄 가져오기
    useEffect(() => {
        axios.get(srcUrl + '/group')
            .then((result) => {
                // console.log(result.data);
                setGroupSchedule(result.data);
            })
    }, [qid]);

    const handleTabChange = (event: React.SyntheticEvent, tabValue: number) => {
        setTab(tabValue);
    };

    const copyTextUrl = () => {
        //나중에 링크 바꿀 것
        navigator.clipboard.writeText('localhost:3000/ko/entry/'+ (qid as string)).then(() => {
            alert("링크가 복사되었습니다")
        })
    }

    return (
        <>
            <CenterFlexLayout>
                <Paper sx={{ boxShadow: 4, padding: 3, maxWidth: 693 }}>
                    <Center><h1>이영석 님의 스케줄러</h1></Center>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={tab} onChange={handleTabChange} aria-label="basic tabs example">
                            <Tab label="내 일정" />
                            <Tab label="그룹 필터" />
                            <Tab label="방 정보" />
                        </Tabs>
                    </Box>
                    {(
                        tab == 0 ?
                            <HStack mb="10" >
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className="md:text-xs text-xs"
                                >
                                    캘린더
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    className="md:text-xs text-xs"
                                >
                                    시간표
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="info"
                                    className="md:text-xs text-xs"
                                >
                                    필터1
                                </Button>

                                <FormGroup>
                                    <FormControlLabel
                                        className="md:text-2xs text-xs"
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                        control={<Checkbox defaultChecked />}
                                        label="그룹 필터 적용하기" />
                                </FormGroup>
                            </HStack>
                            : null
                    )}

                    {(
                        tab == 1 ?
                            <HStack mb={10}>
                                <FormGroup row>
                                    <FormControlLabel
                                        className="md:text-2xs text-xs"
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                        control={<Checkbox defaultChecked />}
                                        label="그룹 필터 적용하기" />
                                    <FormControlLabel
                                        className="md:text-2xs text-xs"
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                        control={<Checkbox defaultChecked />}
                                        label="그룹 필터 적용하기" />
                                </FormGroup>
                            </HStack>
                            
                            : null
                    )}

                    {(
                        loader ? <h1>로딩중</h1> :
                            groupSchedule !== null
                                ?
                                <Scheduler
                                    // roomInfo={props.roomInfo}
                                    ref={scheduleRef}
                                    groupSchedule={groupSchedule}
                                    roomInfo={roomInfo}
                                    isGroup={tab === 0 ? false : true}
                                // groupSchedule={props.groupSchedule}
                                />
                                :
                                null
                    )}
                    

                    <HStack>
                        <Button
                            variant="outlined"
                            startIcon={<LinkIcon />}
                            onClick={copyTextUrl}
                        >
                            링크 복사
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                const mySchedule = scheduleRef.current.testFn()
                                submitMySchedule(mySchedule)
                            }}
                        >제출하기</Button>
                    </HStack>
                </Paper>
            </CenterFlexLayout>
        </>
    )

    function submitMySchedule(props) {

        console.log(props)
        axios({
            method: 'post',
            url: srcUrl + '/participant/available',
            data: {
                "participantName": participantName,
                "available" : props
            }
        })
            .then((result) => {
                console.log(result.data)
                alert('일정이 등록되었습니다.')
            })
            .catch((e) => {
                console.log(e.response)
                alert('일정등록이 실패하였습니다!')
            })

    }
}

export default Room