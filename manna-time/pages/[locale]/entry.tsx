import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Center, VStack } from "@chakra-ui/react"
import { NextPage } from "next"
import { useState } from "react"
import CenterFlexLayout from "../../components/Layout/CenterFlexLayout"
import Login from "../../components/Login"
import Scheduler from "../../components/Scheduler/Scheduler"

const Entry: NextPage = function () {
    console.log("hey")
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            <CenterFlexLayout>
                <Center>
                    <Login />
                </Center>
                <Box p={10}>
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
                </Box>
            </CenterFlexLayout>
        </>
    )
}

export default Entry