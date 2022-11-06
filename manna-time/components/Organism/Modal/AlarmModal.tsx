import { FullButton } from "@/components/Atom/Button"
import { ModalBody, ModalTitle } from "@/components/Atom/Letter/Modal"
import ModalLayout from "@/components/Layout/ModalLayout"
import { ModalState } from "@/src/state/Modal"
import { VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
const AlarmModal = ({ redirect }:{ redirect: string }) => {
    const router = useRouter()
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    return (
        <ModalLayout>
            <VStack>
                <div className="mb-9">
                    <ModalTitle className="mb-4">알림을 예약했습니다!</ModalTitle>
                    <ModalBody>약속 구성원을 초대해주세요<br/>인원이 다 차면 메일을 보내드릴게요</ModalBody>
                </div>
                <FullButton
                    onClick={() => {
                        setIsModalShown(false)
                        router.push(redirect)
                    }}
                    style="white-black"
                    size="small"
                >확인</FullButton>
            </VStack>
        </ModalLayout>
    )
}

export default AlarmModal