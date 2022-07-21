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

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IndeterminateCheckbox from "../../../../components/IndeterminateCheckbox"

const getParsedGroup = (data: object[], myName:string) => {
    let namesExceptMe: string[] = []
    
    let schedulesExceptMe: object[] = []
    let mySchedule: object = {}
    
    data.forEach(obj => {
        if (obj.participantName != myName) {
            schedulesExceptMe.push(obj)
        } else {mySchedule =obj}
    })
    
    schedulesExceptMe.forEach(obj => namesExceptMe.push(obj.participantName))
    return (
        {
            namesExceptMe: namesExceptMe,
            schedulesExceptMe: schedulesExceptMe,
            mySchedule: mySchedule
        }
    )
}

const Room: NextPage = function () {
    const [tab, setTab] = useState(0); // 0: 내 스케줄 , 1: 그룹 스케줄

    const router = useRouter()
    const { qid, participantName } = router.query


    let [roomInfo, setRoomInfo] = useState(null)
    let [loader, setLoader] = useState(true)
    let [groupButtonChecked, setGroupButtonChecked] = useState(false)
    
    //parsed Group Schedule
    let [groupSchedule, setGroupSchedule] = useState(null)
    let [groupNamesExceptMe, setGroupNamesExceptMe] = useState([""])
    let [mySchedule, setMySchedule] = useState(null)
    let [groupFilterChecked, setGroupFilterChecked] = useState([false])

    let scheduleRef = useRef()

    let srcUrl = process.env.NEXT_PUBLIC__API_URL + '/room/' + qid

    // 방 정보 가져오기 -> 추후에 props로 최적화할 것!
    useEffect(() => {
        axios.get(srcUrl)
            .then((result) => {
                setRoomInfo(result.data);
                if (result.data?.title !== undefined) { setLoader(false); };
            })
    }, [qid]);

    // 전체 스케줄 가져오기
    useEffect(() => {
        axios.get(srcUrl + '/group')
            .then((result) => {
                let parsedGroup = getParsedGroup(result.data, participantName)

                setGroupSchedule(parsedGroup.schedulesExceptMe);
                setGroupNamesExceptMe(parsedGroup.namesExceptMe)
                setMySchedule(parsedGroup.mySchedule)
                setGroupFilterChecked(Array(parsedGroup.namesExceptMe.length).fill(true))

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
                            <Tab label="그룹 일정" />
                            <Tab label="방 정보" />
                        </Tabs>
                    </Box>
                    {(
                        tab == 0 ?
                            <>
                                <HStack mb="10" mt="10" >
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className="md:text-xs text-xs"
                                    >
                                        캘린더 연동
                                    </Button>
                                    {/* <Button
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
                                    </Button> */}
                                </HStack>
                                <div className="items-baseline">
                                    <FormControlLabel
                                        className="md:text-2xs text-xs"
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                                        label={"그룹 일정 적용하기"}
                                        control={<Checkbox
                                            checked={groupButtonChecked}
                                            onChange={(e) => setGroupButtonChecked(e.target.checked)}
                                            defaultChecked={groupButtonChecked}
                                        />}
                                    />
                                </div>
                            </>
                            : null
                    )}

                    {(
                        tab == 1 ?
                            <IndeterminateCheckbox
                                participantNames={groupNamesExceptMe}
                                onChange={checked => setGroupFilterChecked(checked)}
                                isChecked={groupFilterChecked}
                            />

                            : null
                    )}

                    {(
                        loader ? <h1>로딩중</h1> :
                            groupSchedule !== null && tab != 2
                                ?
                                <Scheduler
                                    // roomInfo={props.roomInfo}
                                    isDisabled={tab==0?false:true}
                                    ref={scheduleRef}
                                    groupSchedule={groupSchedule}
                                    roomInfo={roomInfo}
                                    isGroup={(tab == 1) || groupButtonChecked ? true : false}
                                    mySchedule={mySchedule}
                                    groupFilterChecked={groupFilterChecked}
                                />
                                :
                                null
                    )}
                    

                    <HStack>
                        <Button
                            variant="outlined"
                            startIcon={<ContentCopyIcon />}
                            onClick={copyTextUrl}
                        >
                            방 링크 복사
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                const mySchedule = scheduleRef.current.testFn()
                                submitMySchedule(mySchedule)
                            }}
                        >내 일정 등록</Button>
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