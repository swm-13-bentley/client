import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, VStack } from "@chakra-ui/react"
import { TextField } from "@mui/material"
import { NextPage } from "next"
import { useState } from "react"
import CenterFlexLayout from "../../components/Layout/CenterFlexLayout"
import Login from "../../components/Login"

const Entry: NextPage = function () {
    console.log("hey")
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    return (
        <CenterFlexLayout>
            <Login />
            {/* <VStack>
                <TextField inputProps={{ maxLength: 15 }} onChange={(e) => { setId(e.target.value) }} placeholder="이름을 입력하세요" variant='standard'></TextField>
                <TextField inputProps={{ maxLength: 15 }} onChange={(e) => { setPassword(e.target.value) }} placeholder="비밀번호를 입력하세요" variant='standard'></TextField>    
            </VStack>
            <Box p={4}>

                <Accordion defaultIndex={[0]} allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    Section 1 title
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box> */}
        </CenterFlexLayout>
    )
}

export default Entry