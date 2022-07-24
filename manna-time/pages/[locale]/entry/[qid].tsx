import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, VStack } from "@chakra-ui/react"
import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetServerSideProps, NextPage } from "next"
import { useEffect, useState } from "react"
import CenterFlexLayout from "../../../components/Layout/CenterFlexLayout"
import ParticipantLogin from "../../../components/ParticipantLogin"
import Scheduler from "../../../components/Scheduler/Scheduler"
import { useRouter } from "next/router";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from "axios";

const Entry: NextPage = function () {

    const router = useRouter()
    const { qid } = router.query

    const srcUrl = process.env.NEXT_PUBLIC_API_URL + '/room/' + qid

    const [roomInfo, setRoomInfo] = useState(null)
    const [loader, setLoader] = useState(true)
    const [groupSchedule, setGroupSchedule] = useState(null)

    const copyTextUrl = () => {
        navigator.clipboard.writeText(process.env.NEXT_PUBLIC_SERVICE_URL + (router.asPath as string)).then(() => {
            alert("링크가 복사되었습니다")
        })
    }

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
            })
    }, [srcUrl]);

    return (
        <>
            <CenterFlexLayout>
                {(
                    roomInfo && roomInfo.title != undefined && roomInfo.dates != undefined
                        ?
                        <>
                            <Center>
                                <ParticipantLogin
                                    eventName={roomInfo.title}
                                    startDate={roomInfo.dates[0]}
                                    endDate={roomInfo.dates[roomInfo.dates.length - 1]}
                                />
                            </Center>
            
                            <Accordion disableGutters className=" mt-10">
                                <AccordionSummary aria-controls="panel1d-content"
                                    expandIcon={<ExpandMoreIcon />}
                                    id="panel1a-header"
                                >
                                    <Typography>현재 그룹 스케줄 확인하기</Typography>
                                </AccordionSummary>
                                {(
                                    !loader ?
                                        <AccordionDetails>
            
                                            <Scheduler
                                                groupSchedule={groupSchedule}
                                                isGroup={true}
                                                roomInfo={roomInfo}
                                                isDisabled={true}
                                            />
                                            <Button
                                                variant="outlined"
                                                startIcon={<ContentCopyIcon />}
                                                onClick={copyTextUrl}
                                            >
                                                방 링크 복사
                                            </Button>
                                        </AccordionDetails>
                                        : null
                                )}
                                
                            </Accordion>
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