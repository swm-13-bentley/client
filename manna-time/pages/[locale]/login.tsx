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

const Login = () => {
    const router = useRouter()
    const authUrl = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=profile%20email%20https://www.googleapis.com/auth/calendar&response_type=code&redirect_uri=https://dev.swm-bentley-server.link/sign/in/redirect/google&client_id=276796066670-078gh8hvcfs0f5ok7rj70508qc3i6pk2.apps.googleusercontent.com"

    const {redirect} = router.query
    const [token, setToken] = useRecoilState(tokenState)
    const decededToken = useRecoilValue(decodedTokenState)

    const redirectPage = () => {
        if (redirect == undefined || _.isArray(redirect)) {
            router.push('/')
        } else {
            router.push(decodeURIComponent(redirect))
        }
    }
    
    // 팝업창으로부터 message 받아 local storage 저장
    useEffect(() => {
        //SSR이기 때문에 window객체가 undefined로 설정. -> DOM 형성 후 실행이 되는 useEffect 사용해야 함
        window.addEventListener("message", (event) => {
            setToken(event.data)
            if (JSON.stringify(decededToken) === JSON.stringify({})) {
                alert("로그인이 유효하지 않습니다. 로그인을 다시 시도해주세요.")
                setToken("")
            } else {
                redirectPage()
            }
        }, false)
    }, [])
    
    return (<Background>
        <CenterScreen>
            <Image src={logo} alt="logo" width="50px" height="50px" />
            <VStack className="mt-4 mb-10">
                <Body2 >약속 일정을 만들고 만날 시간을 함께 정해요</Body2>
            </VStack>
            <FullButton style="lightgrey"    
                onClick={() => { window.open(authUrl, "self", 'popup') }}
            >
                <Image src={googleIcon} alt="google-icon" />
                구글로 시작하기
            </FullButton>
        </CenterScreen>
    </Background>)
}

export default Login