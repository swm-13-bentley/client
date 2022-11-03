import { FullButton } from "@/components/Atom/Button"
import { ModalTitle } from "@/components/Atom/Letter/Modal"
import ModalLayout from "@/components/Layout/ModalLayout"
import { ModalState } from "@/src/state/Modal"
import { HStack, VStack } from "@chakra-ui/react"
import { useState } from "react"
import { useRecoilState } from "recoil"

const CheckPage = ({ onDelete }: { onDelete: () => void }) => {
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    return (<>
        <ModalTitle className="mb-8">선택한 약속을<br />목록에서 삭제할까요?</ModalTitle>
        <HStack>
            <div className=" w-3/5">
                <FullButton
                    onClick={() => setIsModalShown(false)}
                    style="white-black"
                    size="small"
                >아니오</FullButton>
            </div>
            <FullButton
                onClick={onDelete}
                size="small"
            >네, 삭제해주세요</FullButton>
        </HStack>
    </>)
}

const ResultPage = ({ onClick }: { onClick: () => void }) => {
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)

    return (
        <VStack>
            <div className="mb-9">
                <ModalTitle className="mb-4">선택한 약속이<br />삭제되었습니다</ModalTitle>
            </div>
            <FullButton
                onClick={() => {
                    setIsModalShown(false)
                    onClick()
                }}
                style="white-black"
                size="small"
            >확인</FullButton>
        </VStack>)
}

const DeleteModal = ({ onDelete }: { onDelete: ()=>void }) => {
    const [stepIndex, setStepIndex] = useState(0)
    const modalStep = [
        <CheckPage
            onDelete={() => {
                setStepIndex(index=>index+1)
            }}
            key="delete-check" />,
        <ResultPage
            onClick={() => { onDelete() }}
            key="result-page"
        />,
    ]

    return (<ModalLayout>{modalStep[stepIndex]}</ModalLayout>)
}

export default DeleteModal