import { Background } from "@/components/Layout/MainLayout/Wrapper"
import { VStack } from "@chakra-ui/react"
import Image from "next/image"

import logo from "@/public/images/favicon.ico"
import { Body2, Headline2 } from "@/components/Atom/Letter"
import styled from "@emotion/styled"
import { FullButton } from "@/components/Atom/Button"

import googleIcon from "@/public/icons/google.svg"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue } from "recoil"
import { decodedTokenState, tokenState } from "@/src/state/UserInfo"
import { isArray } from "lodash"
import _ from "lodash"

const CenterScreen = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
min-height: 70vh;
`

interface Props {
    url: string
}

const UnknownParticipant = ({url}: Props) => {
    const router = useRouter()
    
    return (<Background>
        <CenterScreen>
            <Image src={logo} alt="logo" width="50px" height="50px" />
            <VStack className="mt-4 mb-10">
                <Body2>일치하는 참여자 정보가 없습니다.</Body2>
            </VStack>
            <FullButton
                onClick={() => { router.push(url) }}
            >다시 로그인하기</FullButton>
        </CenterScreen>
    </Background>)
}

export default UnknownParticipant