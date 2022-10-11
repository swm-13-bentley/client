import { FullButton } from "@/components/Atom/Button";
import ProgressBar from "@/components/Atom/ProgressBar";
import { Background } from "@/components/Layout/MainLayout/Wrapper";
import { BasicButtonContainer, StickyButtonContainer } from "@/components/Molecule/ButtonContainer";
import { AppointmentName, PickDate, PickTimeRange } from "@/components/Organism/MakeRoom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Center, Flex, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { SetStateAction, useEffect, useState } from "react";

import { IconButton } from "@mui/material";
import _ from "lodash";
import axios from "axios";
import { useRouter } from "next/router";
import useViewport from "@/hooks/useViewport";
import { MixpanelTracking } from "@/utils/sdk/mixpanel";

const WhiteBoard = styled.div`
background: #ffffff;
width: 100%;
height: 100%;
`

const Navbar = styled.div`
position: fixed;
width: 100%;
height: 56px;
left: 0px;
top: 0px;
z-index: 100;

display: flex;
align-items: center;
justify-content: center;
background: #FFFFFF;
`

const Title = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 150%;
/* identical to box height, or 24px */

letter-spacing: -0.003em;

color: #333333;
`

const MakeRoom: NextPage = () => {
    const router = useRouter()
    const viewport = useViewport()

    const [stepIndex, setStepIndex] = useState(0)

    // each step value
    const [appointmentName, setAppointmentName] = useState("")
    const [date, setDate] = useState<string[]>([])
    const [timeRange, setTimeRange] = useState<string[] | 'date-only'>([])

    const stepFlags = [appointmentName, date, timeRange]
    const steps = [
        <AppointmentName
            key={'step-0'}
            value={appointmentName}
            setValue={setAppointmentName}
        />,
        <PickDate
            key={'step-1'}
            value={date}
            setValue={setDate}
        />,
        <PickTimeRange
            key={'step-2'}
            setValue={setTimeRange}
        />
    ]


    return (
        <>
            <Navbar>
                <IconButton
                    sx={{ position: 'fixed', left: '15px' }}
                    onClick={() => {
                        if (stepIndex == 0)
                            router.push(`/${router.query.locale}/`)
                        else
                            setStepIndex(step => step - 1)
                    }}
                >
                    <ArrowBackIosNewIcon sx={{ color: "#333333" }} fontSize="small" />
                </IconButton>

                <Title>약속 일정 만들기</Title>
            </Navbar>
            <ProgressBar filled={(stepIndex + 1) / steps.length} />
            <Background>
                <VStack mt={"56px"} mb={ viewport === 'mobile' ? "200px" : "0px"}>
                    {steps[stepIndex]}
                </VStack>
                <StickyButtonContainer
                        id="next-button-container"
                >
                    <FullButton
                        style={
                            stepFlags[stepIndex] == "" || _.isEqual(stepFlags[stepIndex], []) ? "disabled" : "primary"
                        }
                        onClick={() => {
                            if (stepIndex == steps.length - 1)
                                sendRoomRequest()
                            else
                                setStepIndex(step => step + 1)
                        }}
                    >다음</FullButton>
                </StickyButtonContainer>
            </Background>
        </>
    )

    function sendRoomRequest() {
        let srcUrl, sendFlag
        if (timeRange == 'date-only') {
            //날짜만 정하는 방
            srcUrl = process.env.NEXT_PUBLIC_API_URL + '/day/room'
            axios({
                method: 'post',
                url: srcUrl,
                data: {
                    "title": appointmentName,
                    "dates": date
                }
            })
                .then((result) => {
                    router.push(`/${router.query.locale}/invitation/${result.data.roomUuid}?dayOnly=true`);
                })
                .catch((e) => {
                    alert("네트워크 오류가 발생했습니다. 관리자에게 문의하세요.")
                })
        } else {
            //시간대까지 정하는 방
            let srcUrl = process.env.NEXT_PUBLIC_API_URL + '/room'

            if (timeRange[0] == timeRange[1]) {
                alert("시작 시간과 끝 시간은 같을 수 없습니다. 시간을 수정해주세요")
            }
            else {
                axios({
                    method: 'post',
                    url: srcUrl,
                    data: {
                        "title": appointmentName,
                        "dates": date,
                        "startTime": timeRange[0],
                        "endTime": timeRange[1]
                    }
                })
                    .then((result) => {
                        MixpanelTracking.getInstance().track("make-room: 방 만들기 버튼 클릭", {uuid: result.data.roomUuid})
                        router.push(`/${router.query.locale}/invitation/${result.data.roomUuid}`);
                    })
                    .catch((e) => {
                        alert("네트워크 오류가 발생했습니다. 관리자에게 문의하세요.")
                    })
            }
        }
    }
}

export default MakeRoom