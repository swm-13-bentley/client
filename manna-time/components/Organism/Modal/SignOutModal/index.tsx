import { FullButton } from "@/components/Atom/Button"
import { ModalBody, ModalTitle } from "@/components/Atom/Letter/Modal"
import ModalLayout from "@/components/Layout/ModalLayout"
import { ModalState } from "@/src/state/Modal"
import { tokenState } from "@/src/state/UserInfo"
import { HStack, VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

const StyledButton = styled.button`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 160%;
    /* or 22px */

    letter-spacing: -0.003em;
    text-decoration: underline;

    color: #999999;
`

const CheckPage = ({ onDelete }: { onDelete: () => void }) => {
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    return (<>
        <div className="mb-6">
            <ModalTitle className="mb-4">정말로 탈퇴하시겠습니까?</ModalTitle>
            <ModalBody>내가 속해 있는 약속들이 삭제되며,<br />더 이상 복구할 수 없게 됩니다</ModalBody>
        </div>
        <VStack>
            <StyledButton onClick={onDelete}>네, 탈퇴하겠습니다</StyledButton>
            <FullButton
                onClick={() => setIsModalShown(false)}
                size="small"
            >안할게요</FullButton>
        </VStack>
    </>)
}

const ResultPage = ({ onClick }: { onClick: () => void }) => {
    return (
        <VStack>
            <div className="mb-9">
                <ModalTitle className="mb-4">탈퇴가 완료되었습니다</ModalTitle>
            </div>
            <FullButton
                onClick={() => {
                    onClick()
                }}
                style="white-black"
                size="small"
            >홈으로 이동</FullButton>
        </VStack>)
}

const SignOutModal = () => {
    const router = useRouter()

    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)
    const [stepIndex, setStepIndex] = useState(0)
    const [token, setToken] = useRecoilState(tokenState)

    const modalStep = [
        <CheckPage
            onDelete={() => {
                signOutRequest()
            }}
            key="check-page"
        />,
        <ResultPage
            onClick={() => {
                router.push('/')
                setIsModalShown(false)
            }}
            key="result-page"
        />
    ]

    const signOutRequest = () => {
        axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/sign/out`,
            { headers: { 'Authorization': `Bearer ${token}` } }
        )
            .then((request) => {
                setToken("")
                setStepIndex(index => index + 1)
            })
            .catch((e) => {
                // console.log(e)
                alert('오류가 발생했습니다. 관리자에게 문의하세요.')
            })
    }

    return (<ModalLayout>
        {modalStep[stepIndex]}
    </ModalLayout>)
}

export default SignOutModal