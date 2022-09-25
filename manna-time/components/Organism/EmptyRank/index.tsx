import { FullButton } from "@/components/Atom/Button"
import { NoticeDescription, NoticeTitle } from "@/components/Atom/Letter"
import { Background } from "@/components/Layout/MainLayout/Wrapper"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import Image from "next/image"
import { useRouter } from "next/router"

interface EmptyRankProps {
    url: string
}

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

const EmptyRank = ({ url }: EmptyRankProps) => {
    const router= useRouter()
    return (
        <Background>
            <VStack mt="100px" mb="40px">
                <Image src="/images/EmptyBox.png" alt="empty-box" width="100px" height="100px"/>
                <StyledP>아직 등록된 일정이 없어요</StyledP>
                <NoticeDescription>참석자를 초대하고 일정을 등록해주세요</NoticeDescription>
            </VStack>
            <VStack>
                <FullButton style="primary"
                    onClick={() => {   
                        router.push(url)
                    }}
                >내 일정 등록하기</FullButton>
            </VStack>
        </Background>
    )
}

export default EmptyRank