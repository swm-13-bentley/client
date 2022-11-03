import { FullButton } from "@/components/Atom/Button"
import { NoticeDescription, NoticeTitle } from "@/components/Atom/Letter"
import { Background } from "@/components/Layout/MainLayout/Wrapper"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import Image from "next/image"
import { useRouter } from "next/router"
import emptyBox from "@/public/images/empty-box.png"
import { useEffect, useState } from "react"

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

const EmptyPlan = ({ type }: { type: 'confirmed' | 'unconfirmed' }) => {
    const [word, setWord] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (type == 'confirmed') {
            setWord('확정된')
            setDescription('대기중인 약속에서 확정 버튼을 클릭하세요!')
        }
        else if (type == 'unconfirmed') {
            setWord('내가 참여한')
            setDescription('약속을 만들어 구성원들에게 공유해보세요!')
        }
    }, [])
    
    return (
        <Background>
            <VStack mt="100px" mb="40px">
                <Image src={emptyBox} alt="empty-box" width="100px" height="100px" />
                <StyledP>아직 {word} 약속이 없어요</StyledP>
                <NoticeDescription>{description}</NoticeDescription>
            </VStack>
        </Background>
    )
}

export default EmptyPlan