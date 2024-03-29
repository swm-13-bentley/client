import { FullButton } from "@/components/Atom/Button"
import NonLinearSlider from "@/components/Atom/Slider"
import ModalLayout from "@/components/Layout/ModalLayout"
import { ModalState } from "@/src/state/Modal"
import { changeDateToKorean, getServerTimeFormat } from "@/utils/changeFormat"
import { HStack, VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import hours from "@/components/Molecule/Scheduler/Hours"
import axios from "axios"
import { stringify } from "querystring"
import { useRouter } from "next/router"
import { ModalBody, ModalTitle } from "@/components/Atom/Letter/Modal"

interface ConfirmProps {
    startTime?: number
    endTime?: number
    date: string
}

interface RequestData {
    confirmedDate: string
    startTime?: string
    endTime?: string
}

const TimeCheck = ({ startTime, endTime, date, onNextClick, onChange }: { startTime: number, endTime: number, date: string, onNextClick: () => void, onChange: (value: number[]) => void }) => {
    return (
        <VStack>
            <div className="w-full mb-4">
                <ModalTitle className="mb-4">확정 시간을 조정하세요</ModalTitle>
                <NonLinearSlider startTime={startTime} endTime={endTime} date={changeDateToKorean(date)} onChange={onChange} />
            </div>
            <FullButton
                size="small"
                onClick={onNextClick}
            >다음</FullButton>
        </VStack>
    )
}

const ConfirmCheck = ({ onConfirm }: { onConfirm: () => void }) => {
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    return (<>
        <div className="mb-12">
            <ModalTitle className="mb-4">일정을 확정할까요?</ModalTitle>
            <ModalBody>확정 시 로그인 참여자들에게 알림이<br />가며, 연동된 캘린더에 등록 가능합니다</ModalBody>
        </div>
        <HStack>
            <div className=" w-3/5">
                <FullButton
                    onClick={() => setIsModalShown(false)}
                    style="white-black"
                    size="small"
                >아니오</FullButton>
            </div>
            <FullButton
                onClick={onConfirm}
                size="small"
            >네, 확정할게요</FullButton>
        </HStack>
    </>)
}

const ConfirmResult = () => {
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    return (<VStack>
        <div className="mb-8">
            <ModalTitle>약속 일정이<br />확정되었습니다!</ModalTitle>
        </div>
        <FullButton style="white-black" size="small" onClick={() => setIsModalShown(false)}>확인</FullButton>
    </VStack>)
}


const ConfirmModal = ({ startTime, endTime, date }: ConfirmProps) => {
    const router = useRouter()

    const {qid} = router.query
    const dayOnly = (startTime == undefined || endTime == undefined)

    const [stepIndex, setStepIndex] = useState(0)
    const [timeValue, setTimeValue] = useState([startTime, endTime])
    const [isWaiting, setIsWaiting] = useState(false)
    const modalStep = [
        <ConfirmCheck
            onConfirm={() => {
                onConfirm()
            }} key="confirm-check"
        />,
        <ConfirmResult key="confirm-result" />
    ]

    if (!dayOnly)
        modalStep.splice(0, 0,
            <TimeCheck
                startTime={startTime}
                endTime={endTime}
                date={date}
                onNextClick={() => setStepIndex(stepIndex + 1)}
                onChange={(value) => { setTimeValue(value) }}
                key="time-check"
            />)

    const onConfirm = () => {
        let data: RequestData = { confirmedDate: date }

        if (!dayOnly && timeValue[0] != undefined && timeValue[1] != undefined) {
            data.startTime = getServerTimeFormat(timeValue[0])
            data.endTime = getServerTimeFormat(timeValue[1])
        }

        if (!isWaiting) {
            setIsWaiting(true)
            axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/room/${qid}/confirm`,
                data
            )
                .then((response) => {
                    setStepIndex(stepIndex + 1)
                    setIsWaiting(false)
                })
                .catch((e) => {
                    setIsWaiting(false)
                    alert("에러가 발생했습니다. 관리자에게 문의하세요.")
                })
        }
    }

    return (
        <ModalLayout>
            {modalStep[stepIndex]}
        </ModalLayout>
    )
}

export default ConfirmModal