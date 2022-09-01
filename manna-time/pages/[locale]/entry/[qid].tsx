import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, VStack } from "@chakra-ui/react"
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetServerSideProps, NextPage } from "next"
import React, { SyntheticEvent, useEffect, useState } from "react"
import CenterFlexLayout from "../../../components/Layout/CenterFlexLayout"
import ParticipantLogin from "@/components/Molecule/ParticipantLogin/ParticipantLogin"
import Scheduler from "@/components/Molecule/Scheduler/Scheduler"
import { useRouter } from "next/router";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import IndeterminateCheckbox from "@/components/Molecule/IndeterminateCheckbox/IndeterminateCheckbox";
import { MixpanelTracking } from "@/utils/mixpanel";
import TimeRank from "@/components/Molecule/Rank/TimeRank";
import copyTextUrl from "@/utils/copyTextUrl";

const Entry: NextPage = function () {

    const router = useRouter()
    const { qid } = router.query

    const srcUrl = process.env.NEXT_PUBLIC_API_URL + '/room/' + qid
    const textUrl = process.env.NEXT_PUBLIC_SERVICE_URL + (router.asPath as string)

    const [expanded, setExpanded] = useState(true)

    const [roomInfo, setRoomInfo] = useState(null)
    const [loader, setLoader] = useState(true)
    const [groupSchedule, setGroupSchedule] = useState(null)
    const [groupFilterChecked, setGroupFilterChecked] = useState(null)
    const [participantNames, setParticipantNames] = useState(null)

    const [timeRanks, setTimeRanks] = useState(undefined)

    useEffect(() => {
        axios.get(srcUrl)
            .then((result) => {
                setRoomInfo(result.data);
                if (result.data?.title !== undefined) { setLoader(false); };
            })
    }, [srcUrl]);

    // 전체 스케줄 가져오기
    useEffect(() => {
        axios.get(srcUrl + '/group')
            .then((result) => {
                setGroupSchedule(result.data);

                let tempParticipantNames: string[] = []
                result.data.forEach(obj => {
                    tempParticipantNames.push(obj.participantName)
                })
                setParticipantNames(tempParticipantNames)
            })
    }, [srcUrl]);

    // top 5 time ranks 가져오기
    useEffect(() => {
        axios.get(srcUrl + '/top/5')
            .then((result) => {
                setTimeRanks(result.data)
            })
    }, [srcUrl])

    return (
        <>
            <CenterFlexLayout>
                {(
                    roomInfo && roomInfo.title != undefined && roomInfo.dates != undefined
                        ?
                        <>
                            <Accordion
                                // defaultExpanded={true}
                                disableGutters
                                className=" mb-10"
                                expanded={expanded}
                            >
                                <AccordionSummary aria-controls="panel1d-content"
                                    expandIcon={<ExpandMoreIcon />}
                                    id="panel1a-header"
                                    onClick={(e: SyntheticEvent) => { setExpanded(!expanded) }}
                                >
                                    {/* <Typography>현재 그룹 스케줄 확인하기</Typography> */}
                                </AccordionSummary>
                                {(
                                    !loader ?
                                        <AccordionDetails
                                            sx={{ padding: 0 }}

                                        >
                                            <Center mb="5">
                                                <p className="text-lg font-bold">{roomInfo.title}</p>
                                            </Center>
                                            <Center mb="10">
                                                <p className="text-sm font-bold">{roomInfo.dates[0]} ~ {roomInfo.dates[roomInfo.dates.length - 1]}</p>
                                            </Center>

                                            <Center mb="5">
                                                <Button
                                                    className="mr-5"
                                                    variant="contained"
                                                    startIcon={<ContentCopyIcon />}
                                                    onClick={() => {
                                                        MixpanelTracking.getInstance().buttonClicked("entry: 링크 복사")
                                                        copyTextUrl(textUrl)
                                                    }}
                                                >
                                                    방 링크 복사
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<LoginIcon />}
                                                    onClick={(e: React.SyntheticEvent) => {
                                                        setExpanded(false)
                                                        MixpanelTracking.getInstance().buttonClicked("entry: 내 시간 입력(아코디언 접기)")
                                                    }}
                                                >
                                                    내 시간 입력
                                                </Button>
                                            </Center>

                                                {
                                                    timeRanks != undefined && participantNames != null
                                                        ?
                                                        <Center>
                                                            <TimeRank
                                                                ranks={timeRanks}
                                                                totalNum = {participantNames.length}
                                                            />
                                                        </Center>
                                                        :
                                                        null
                                                }
                                            <div className="ml-5 mr-5">
                                                <IndeterminateCheckbox
                                                    participantNames={participantNames}
                                                    onChange={checked => setGroupFilterChecked(checked)}
                                                    isChecked={null}
                                                />
                                            </div>

                                            <div className="mb-6">
                                                <Scheduler
                                                    groupSchedule={groupSchedule}
                                                    isGroup={true}
                                                    roomInfo={roomInfo}
                                                    isDisabled={true}
                                                    groupFilterChecked={groupFilterChecked}
                                                />
                                            </div>

                                        </AccordionDetails>
                                        : null
                                )}

                            </Accordion>

                            <Center className="mb-10">
                                <ParticipantLogin
                                    eventName={roomInfo.title}
                                    startDate={roomInfo.dates[0]}
                                    endDate={roomInfo.dates[roomInfo.dates.length - 1]}
                                />
                            </Center>



                            {/* chakra version */}
                            {/* <Box p={10}>
                                <Accordion defaultIndex={[0]} allowMultiple>
                                    <AccordionItem>
                                        <h2>
                                            <AccordionButton>
                                                <Box flex='1' textAlign='left'>
                                                    현재 그룹 스케줄 확인하기
                                                </Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={4}>
                                            <Scheduler/>
                                        </AccordionPanel>
                                    </AccordionItem>
                                </Accordion>
                            </Box> */}
                        </>
                        :
                        null
                )}
            </CenterFlexLayout>
        </>
    )
}

// export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
//     const qid = getStringValueFromQuery({query, field: 'qid'})
// }

export default Entry