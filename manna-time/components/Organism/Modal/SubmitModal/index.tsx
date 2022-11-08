import { FullButton } from "@/components/Atom/Button"
import { ModalBody, ModalTitle } from "@/components/Atom/Letter/Modal"
import ModalLayout from "@/components/Layout/ModalLayout"
import { ModalState } from "@/src/state/Modal"
import { tokenState } from "@/src/state/UserInfo"
import { HStack, VStack } from "@chakra-ui/react"
import axios from "axios"
import { Router, useRouter } from "next/router"
import { useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"

interface ModalProps {
    isLoggedIn: boolean
    dayOnly: boolean
    schedule: any
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

const AlarmPage = ({ onAgree, onDisagree }: { onAgree: () => void, onDisagree: () => void }) => {
    return (<>
        <div className="mb-9">
            <ModalTitle className="mb-4">확정 알림을 받으실래요?</ModalTitle>
            <ModalBody>약속 확정 시 메일로 알림을 보내드리며<br />구글 캘린더에 등록도 할 수 있어요</ModalBody>
        </div>
        <HStack>
            <div className=" w-3/5">
                <FullButton
                    onClick={onDisagree}
                    style="white-black"
                    size="small"
                >아니오</FullButton>
            </div>
            <FullButton
                onClick={onAgree}
                size="small"
            >네, 받을래요</FullButton>
        </HStack>
    </>)
}

const ResultPage = ({ dayOnly }: { dayOnly: boolean }) => {
    const router = useRouter()
    const { locale, qid } = router.query
    return (
        <VStack>
            <div className="mb-9">
                <ModalTitle className="mb-4">내 일정이<br />등록되었습니다!</ModalTitle>
                <ModalBody>참여자들의 종합된 일정을 확인하세요</ModalBody>
            </div>
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
        </VStack>)
}

const SubmitModal = ({ isLoggedIn, dayOnly, schedule }: ModalProps) => {
    const router = useRouter()
    const { qid, name, locale } = router.query

    const [stepIndex, setStepIndex] = useState(0)
    const token = useRecoilValue(tokenState)

    const modalStep = [
        <CheckPage
            onSubmit={() => {
                if (dayOnly)
                    submitDaySchedule(schedule)
                else
                    submitMySchedule(schedule)
            }}
            key="submit-check" />,
        <AlarmPage
            onAgree={() => {
                //날짜방, 시간방을 구분할 필요 없음
                router.push({
                    pathname: '/ko/login',
                    query: {
                        redirect: `/ko/${dayOnly ? 'date/' : ''}entry/${qid}`,
                        participantName: name,
                        roomUuid: qid
                    }
                }, '/ko/login'
                )
            }}
            onDisagree={() => {
                setStepIndex(index => index + 1)
            }}
            key="alarm-page"
        />,
        <ResultPage
            dayOnly={dayOnly}
            key="result-page"
        />,
    ]

    return (
        <ModalLayout>
            {modalStep[stepIndex]}
        </ModalLayout>
    )

    function submitMySchedule(props: any) {
        if (isLoggedIn) {
            axios.post(
                `/api/user/time/${qid}/submit`,
                {
                    "participantName": name,
                    "available": props
                },
                { headers: { token: `${token}` } }
            )
                .then((result) => {
                    setStepIndex(index => index + 2)
                })
                .catch((e) => {
                    console.log(e)
                    alert('일정등록이 실패하였습니다!')
                })
        } else {
            axios({
                method: 'post',
                url: `${process.env.NEXT_PUBLIC_API_URL}/room/${qid}/participant/available`,
                data: {
                    "participantName": name,
                    "available": props
                }
            })
                .then((result) => {
                    setStepIndex(index => index + 1)
                })
                .catch((e) => {
                    // console.log(e.response)
                    alert('일정등록이 실패하였습니다!')
                })
        }

    }

    function submitDaySchedule(props: any) {
        let srcUrl = process.env.NEXT_PUBLIC_API_URL + '/day/room/' + qid

        if (isLoggedIn) {
            axios.post(
                `/api/user/date/${qid}/submit`,
                {
                    "participantName": name,
                    "availableDates": props
                },
                { headers: { token: `${token}` } }
            )
                .then((result) => {
                    setStepIndex(index => index + 2)
                })
                .catch((e) => {
                    console.log(e)
                    alert('일정등록이 실패하였습니다!')
                })
        } else {
            axios({
                method: 'post',
                url: srcUrl + '/participant/available',
                data: {
                    "participantName": name,
                    "availableDates": props
                }
            })
                .then((result) => {
                    setStepIndex(index => index + 1)
                })
                .catch((e) => {
                    // console.log(e.response)
                    alert('일정등록이 실패하였습니다! 관리자에게 문의하세요')
                })
        }
    }
}

export default SubmitModal