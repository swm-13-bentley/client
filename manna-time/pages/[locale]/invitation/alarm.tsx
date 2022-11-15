import { Background } from "@/components/Layout/MainLayout/Wrapper"
import NoGnbLayout from "@/components/Layout/NoGnbLayout"
import { NextPage } from "next"
import alarmIcon from "@/public/icons/alarm.svg"
import Image from "next/image"
import { VStack } from "@chakra-ui/react"
import { Body1, Headline2, Subhead2 } from "@/components/Atom/Letter"
import { FullButton } from "@/components/Atom/Button"
import PlusMinusCount from "@/components/Molecule/PlusMinusCount"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import { useRecoilState, useRecoilValue } from "recoil"
import { tokenState } from "@/src/state/UserInfo"
import { ModalState } from "@/src/state/Modal"
import AlarmModal from "@/components/Organism/Modal/AlarmModal"

const Alarm: NextPage = function () {
    const router = useRouter()
    const { qid, redirect } = router.query
    const token = useRecoilValue(tokenState)
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)

    const [count, setCount] = useState(0)

    const onAlarmClick = () => {
        axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/room/alarm`, {
            roomUuid: qid as string,
            alarmNumber: count
        },
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
            .then((response) => {
                setIsModalShown(true)
            })
            .catch((e) => {
                alert('오류가 발생했습니다. 관리자에게 문의하세요.')
            })
    }

    return (
        <NoGnbLayout title={""} redirect={redirect as string}>
            <Background>
                {
                    isModalShown && <AlarmModal redirect={redirect as string} />
                }
                <VStack style={{
                    position: 'fixed',
                    maxWidth: 500,
                    width: '100%',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    textAlign: 'center'
                }}>
                    <Image src={alarmIcon} alt="alarm-icon" />
                    <Headline2 style={{ marginBottom: "40px" }}>일정 인원이 참가하면<br />알림을 드릴까요?</Headline2>
                    <Subhead2 style={{ marginBottom: "20px" }}>인원수</Subhead2>
                    <div style={{ marginBottom: "90px" }}>
                        <PlusMinusCount onChange={(count: number) => setCount(count)} />
                    </div>

                    <FullButton onClick={onAlarmClick}>알림 받기</FullButton>
                    <button
                        style={{ marginTop: "10px" }}
                        onClick={() => { router.push(redirect as string) }}
                    >
                        <Body1>안 받을래요</Body1>
                    </button>
                </VStack>
            </Background>
        </NoGnbLayout>

    )
}


export default Alarm
