import { InputBox } from "@/components/Atom/Box"
import { Body1, Caption, Headline2 } from "@/components/Atom/Letter"
import { Background } from "@/components/Layout/MainLayout/Wrapper"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { useState } from "react"

interface ParticipantInputProps {
    name: string
    setName(name: string): void
    password: string
    setPassword: (password: string) => void
    errorMessage?: string
}

const Comment = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 160%;
/* or 22px */

letter-spacing: -0.003em;

color: #999999;
`

const Span = styled.span`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 160%;
margin-left: 2px;
/* or 19px */

letter-spacing: -0.003em;

color: #5194FF;

`

const ParticipantInput = ({ name, setName, password, setPassword, errorMessage }: ParticipantInputProps) => {
    return (
        <div className="mx-auto">
            <VStack mt="60px" mb="40px">
                <Headline2 className=" mb-2">이름을 알려주세요</Headline2>
                {
                    errorMessage
                        ? <Body1 style={{ color: "#FF543A" }}>{errorMessage}</Body1>
                        : <Body1>이전에 등록한 이름으로 일정 수정도 가능해요</Body1>
                }
            </VStack>

            <Caption className=" mb-2">내 이름 <Span>(필수)</Span></Caption>
            <InputBox placeholder="김언제" id="name" setValue={setName} value={name} />
            <Caption className=" mb-2 mt-5">비밀번호 (옵션)</Caption>
            <InputBox placeholder="비밀번호" id="password" setValue={setPassword} value={password} />
            <Comment className=" mt-1">보안을 위해 비밀번호를 사용할 수 있어요</Comment>
        </div>)
}

export default ParticipantInput