import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, VStack } from "@chakra-ui/react"
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GetServerSideProps, NextPage } from "next"
import { useState } from "react"
import CenterFlexLayout from "../../../components/Layout/CenterFlexLayout"
import ParticipantLogin from "../../../components/ParticipantLogin"
import Scheduler from "../../../components/Scheduler/Scheduler"
import { useRouter } from "next/router";

const Entry: NextPage = function () {
    return (
        <>
            <CenterFlexLayout>
                <Center>
                    <ParticipantLogin />
                </Center>

                <Accordion disableGutters className=" mt-10">
                    <AccordionSummary aria-controls="panel1d-content"
                        expandIcon={<ExpandMoreIcon />}
                        id="panel1a-header"
                    >
                        <Typography>현재 그룹 스케줄 확인하기</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Scheduler/>
                    </AccordionDetails>
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
            </CenterFlexLayout>
        </>
    )
}

// export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
//     const qid = getStringValueFromQuery({query, field: 'qid'})
// }

export default Entry