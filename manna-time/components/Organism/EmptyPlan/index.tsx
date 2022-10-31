import { FullButton } from "@/components/Atom/Button"
import { NoticeDescription, NoticeTitle } from "@/components/Atom/Letter"
import { Background } from "@/components/Layout/MainLayout/Wrapper"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import Image from "next/image"
import { useRouter } from "next/router"
import emptyBox from "@/public/images/empty-box.png"

const StyledP = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 150%;
    /* identical to box height, or 36px */

    text-align: center;
    letter-spacing: -0.003em;

    color: #333333;
`

const EmptyPlan = () => {
    const router= useRouter()
    return (
        <Background>
            <VStack mt="100px" mb="40px">
                <Image src={emptyBox} alt="empty-box" width="100px" height="100px"/>
                <StyledP>아직 등록된 약속이 없어요</StyledP>
                <NoticeDescription>약속을 만들어 구성원들에게 공유해보세요!</NoticeDescription>
            </VStack>
            <VStack>
                <FullButton style="secondary"
                    onClick={() => {   
                        router.push('/ko/make-room')
                    }}
                >약속 만들기</FullButton>
            </VStack>
        </Background>
    )
}

export default EmptyPlan