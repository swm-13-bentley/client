/* eslint-disable react-hooks/exhaustive-deps */
import { Background } from "@/components/Layout/MainLayout/Wrapper"
import { useToast, VStack } from "@chakra-ui/react"
import Image from "next/image"

import logo from "@/public/images/favicon.ico"
import { Body2, Headline2 } from "@/components/Atom/Letter"
import styled from "@emotion/styled"
import { FullButton } from "@/components/Atom/Button"

import googleIcon from "@/public/icons/google.svg"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue } from "recoil"
import { decodedTokenState, tokenState } from "@/src/state/UserInfo"
import { isArray } from "lodash"
import _ from "lodash"
import axios from "axios"
import { MixpanelTracking } from "@/utils/sdk/mixpanel"

const CenterScreen = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
text-align: center;
min-height: 70vh;
`

const StyledP = styled.div`
font-family: 'Roboto';
`

const Login = () => {
    const router = useRouter()
    // participantName, roomUuid의 경우 비회원 참가자가 로그인 할 때만 사용
    const { redirect, participantName, roomUuid } = router.query

    const [authUrl, setAuthUrl] = useState("")
    const [token, setToken] = useRecoilState(tokenState)
    const decodedToken = useRecoilValue(decodedTokenState)

    const toast = useToast({
        position: 'bottom',
        title: '로그인 실패',
        description: "access denied",
        status: 'error',
        duration: 1000,
        isClosable: true,
      })

    const redirectPage = () => {
        if (redirect == undefined || _.isArray(redirect)) {
            router.push('/')
        } else {
            router.push(decodeURIComponent(redirect))
        }
    }

    const onLoginClick = () => {
        MixpanelTracking.getInstance().buttonClicked("login: 구글 계정으로 로그인")

        if (navigator.userAgent.indexOf('KAKAO') >= 0)
            alert('구글 정책으로 카카오톡 인앱에서는 로그인이 불가합니다😢 크롬, 사파리 등 다른 브라우저를 이용해주세요.')
        else if (navigator.userAgent.indexOf('Instagram') >= 0)
            alert('구글 정책으로 인스타그램 인앱에서는 로그인이 불가합니다😢 크롬, 사파리 등 다른 브라우저를 이용해주세요.')
        else if (navigator.userAgent.indexOf('[FB') >= 0)
            alert('구글 정책으로 페이스북 인앱에서는 로그인이 불가합니다😢 크롬, 사파리 등 다른 브라우저를 이용해주세요.')
        else if (navigator.userAgent.indexOf('everytimeApp') >= 0)
            alert('구글 정책으로 에브리타임 인앱에서는 로그인이 불가합니다😢 크롬, 사파리 등 다른 브라우저를 이용해주세요.')
        else
            window.open(authUrl, "self", 'popup')
    }

    // 팝업창으로부터 message 받아 local storage 저장
    useEffect(() => {
        //SSR이기 때문에 window객체가 undefined로 설정. -> DOM 형성 후 실행이 되는 useEffect 사용해야 함
        window.addEventListener("message", (event) => {
            if (event.data == 'fail')
                toast()
            else
                setToken(event.data)
        }, false)

        //로그인 url 설정
        if (participantName != undefined && roomUuid != undefined) {
            axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/sign/in/google`,
                {
                    "roomUuid": roomUuid,
                    "participantName": participantName
                }
            )
                .then((result) => {
                    setAuthUrl(result.data.authUrl)
                })
                .catch((e) => {
                    console.log(e)
                    alert("오류가 발생했습니다. 방 id와 이름이 존재하지 않습니다")
                })
        } else {
            axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/sign/in/google`
            )
                .then((result) => {
                    setAuthUrl(result.data.authUrl)
                })
                .catch((e) => {
                    console.log(e)
                    alert("네트워크 오류가 발생했습니다. 관리자에게 문의하세요.")
                })
            // setAuthUrl("https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=profile%20email%20https://www.googleapis.com/auth/calendar&response_type=code&redirect_uri=https://dev.swm-bentley-server.link/sign/in/redirect/google&client_id=276796066670-078gh8hvcfs0f5ok7rj70508qc3i6pk2.apps.googleusercontent.com")
        }
    }, [])

    // token 변했을 시 시행
    useEffect(() => {
        if (!_.isEmpty(decodedToken)) {
            if (decodedToken.error != undefined) {
                alert("로그인이 유효하지 않습니다. 관리자에게 문의하세요.")
                setToken("")
            } else {
                redirectPage()
            }
        }
    }, [decodedToken])

    return (<Background>
        <CenterScreen>
            <Image src={logo} alt="logo" width="50px" height="50px" />
            <VStack className="mt-4 mb-10">
                <Body2 >약속 일정을 만들고 만날 시간을 함께 정해요</Body2>
            </VStack>
            <FullButton style="white-black"
                onClick={() => {
                    onLoginClick()
                }}
            >
                <Image src={googleIcon} alt="google-icon"/>
                <StyledP>Google 계정으로 로그인</StyledP>
            </FullButton>
        </CenterScreen>
    </Background>)
}

export default Login