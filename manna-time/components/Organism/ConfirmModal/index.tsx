import { FullButton } from "@/components/Atom/Button"
import NonLinearSlider from "@/components/Atom/Slider"
import ModalLayout from "@/components/Layout/ModalLayout"
import { ModalState } from "@/src/state/Modal"
import { HStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { useState } from "react"
import { useRecoilState } from "recoil"

interface SliderProps {
    startTime: number
    endTime: number
    date: string
}

const Title = styled.p`
    font-family: 'pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    /* identical to box height, or 36px */

    text-align: center;
    letter-spacing: -0.003em;

    color: #333333;
`

const Body = styled.p`
    font-family: 'pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    /* or 22px */

    text-align: center;
    letter-spacing: -0.003em;

    color: #333333;
`

const TimeCheck = ({ slider, onNextClick }: { slider: SliderProps, onNextClick: () => void }) => {
    return (
        <>
            <div className="mb-4">
                <Title className="mb-4">시간을 확인해주세요</Title>
                <NonLinearSlider startTime={slider.startTime} endTime={slider.endTime} date={slider.date} />
            </div>
            <FullButton
                size="small"
                onClick={onNextClick}
            >다음</FullButton>
        </>
    )
}

const ConfirmCheck = ({ onConfirm }: { onConfirm: () => void }) => {
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    return (<>
        <div className="mb-12">
            <Title className="mb-4">일정을 확정할까요?</Title>
            <Body>확정 시 로그인 참여자들에게 알림이<br/>가며, 연동된 캘린더에 등록 가능합니다</Body>
        </div>
        <HStack>
            <div className=" w-3/5">
                <FullButton
                    onClick={()=>setIsModalShown(false)}
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
    return (<>
        <div className="mb-8">
            <Title>약속 일정이<br/>확정되었습니다!</Title>
        </div>
        <FullButton style="white-black" size="small" onClick={()=>setIsModalShown(false)}>확인</FullButton>
    </>)
}


const ConfirmModal = ({ slider, dayOnly }: { slider: SliderProps, dayOnly: boolean }) => {
    const [stepIndex, setStepIndex] = useState(dayOnly ? 1 : 0)
    const modalStep = [
        <TimeCheck
            slider={slider} onNextClick={() => setStepIndex(stepIndex + 1)} key="time-check"
        />,
        <ConfirmCheck
            onConfirm={()=>setStepIndex(stepIndex + 1)} key="confirm-check"
        />,
        <ConfirmResult key="confirm-result"/>
    ]

    return (
        <ModalLayout>
            {modalStep[stepIndex]}
        </ModalLayout>
    )
}

export default ConfirmModal