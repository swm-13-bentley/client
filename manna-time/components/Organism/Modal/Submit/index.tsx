import { FullButton } from "@/components/Atom/Button"
import { ModalBody, ModalTitle } from "@/components/Atom/Letter/Modal"
import ModalLayout from "@/components/Layout/ModalLayout"
import { ModalState } from "@/src/state/Modal"
import { HStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"
import { useRecoilState } from "recoil"

interface ModalProps {
    isLoggedIn: boolean
    dayOnly: boolean
}

const CheckPage = ({ onSubmit }: { onSubmit: () => void }) => {
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    return (<>
        <ModalTitle className="mb-8">입력한 일정으로<br />등록할까요?</ModalTitle>
        <HStack>
            <div className=" w-3/5">
                <FullButton
                    onClick={() => setIsModalShown(false)}
                    style="white-black"
                    size="small"
                >아니오</FullButton>
            </div>
            <FullButton
                onClick={onSubmit}
                size="small"
            >네, 등록할게요</FullButton>
        </HStack>
    </>)
}

const ResultPage = ({ onNextClick, isLoggedIn, dayOnly }: { onNextClick: () => void, isLoggedIn: boolean, dayOnly: boolean }) => {
    const router = useRouter()
    const { locale, qid } = router.query
    return (
        <>
            <div className="mb-9">
                <ModalTitle className="mb-4">내 일정이<br />등록되었습니다!</ModalTitle>
                <ModalBody>참여자들의 종합된 일정을 확인하세요</ModalBody>
            </div>
            {
                isLoggedIn
                    ?
                    <FullButton
                        onClick={() => {
                            if (dayOnly)
                                router.push(`/${locale}/date/entry/${qid}`)
                            else
                                router.push(`/${locale}/entry/${qid}`)
                        }}
                        style="secondary"
                        size="small"
                    >일정 보러가기</FullButton>
                    :
                    <FullButton size="small" onClick={onNextClick}>다음</FullButton>
            }
        </>)
}

const AlarmPage = ({onAgree}:{onAgree:()=>void}) => {
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    return (<>
        <div className="mb-9">
            <ModalTitle className="mb-4">알림을 받으실래요?</ModalTitle>
            <ModalBody>약속 확정 시 메일로 알림을 보내드리고<br/>구글 캘린더에 등록도 할 수 있어요</ModalBody>
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
                onClick={onAgree}
                size="small"
            >네, 등록할게요</FullButton>
        </HStack>
    </>)
}

const SubmitModal = ({ isLoggedIn, dayOnly }: ModalProps) => {
    const router = useRouter()
    const { qid, name } = router.query

    const [stepIndex, setStepIndex] = useState(0)

    const modalStep = [
        <CheckPage
            onSubmit={() => {
                setStepIndex(index => index + 1)
            }}
            key="submit-check" />,
        <ResultPage
            onNextClick={() => { setStepIndex(index => index + 1) }}
            isLoggedIn={isLoggedIn}
            dayOnly={dayOnly}
            key="result-page"
        />,
        <AlarmPage
            onAgree={() => {
                if (!dayOnly)
                    router.push({
                        pathname: '/ko/login',
                        query: {
                            redirect: `/ko/user/enter-room?qid=${qid}&dayOnly=false`,
                            participantName: name,
                            roomUuid: qid
                        }
                    }, '/ko/login'
                    )
            }}
            key="alarm-page"
        />
    ]

    return (
        <ModalLayout>
            {modalStep[stepIndex]}
        </ModalLayout>
    )
}

export default SubmitModal