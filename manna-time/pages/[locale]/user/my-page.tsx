import { BasicButton } from "@/components/Atom/Button";
import { Body1, Body2, Headline1, Subhead2, Subhead3 } from "@/components/Atom/Letter";
import Line from "@/components/Atom/Line";
import { Background } from "@/components/Layout/MainLayout/Wrapper";
import NoGnbLayout from "@/components/Layout/NoGnbLayout"
import profileIcon from '@/public/icons/navbar/profile.svg'
import { decodedTokenState, isLoggedInState, tokenState } from "@/src/state/UserInfo";
import { HStack, useToast, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import unfilledKakaoIcon from "@/public/icons/calendarLogo/unfilled/kakao.svg"
import filledGoogleIcon from "@/public/icons/calendarLogo/filled/google.svg"
import unfilledAppleIcon from "@/public/icons/calendarLogo/unfilled/apple.svg"
import unfilledNaverIcon from "@/public/icons/calendarLogo/unfilled/naver.svg"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ModifyName from "@/components/Molecule/ModifyName";
import axios from "axios";
import EmailAlarm, { AlarmEmail } from "@/components/Molecule/EmailAlarm";
import { ModalState } from "@/src/state/Modal";
import SignOutModal from "@/components/Organism/Modal/SignOutModal";

const Description = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    letter-spacing: -0.3px;
    color: #999999;
`

const MyPage = () => {
    const router = useRouter()

    const decodedToken = useRecoilValue(decodedTokenState)
    const [token, setToken] = useRecoilState(tokenState)
    const isLoggedIn = useRecoilValue(isLoggedInState)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [alarmEmails, setAlarmEmails] = useState<AlarmEmail[]>([])

    const [modify, setModify] = useState(false)
    const [isModalShown, setIsModalShown] = useRecoilState(ModalState)


    const pushLogout = () => {
        setToken("")
        router.push('/')
    }

    const pushPrivacyPolicy = () => {
        router.push('/ko/privacy-policy')
    }

    useEffect(() => {
        if (isLoggedIn) {
            axios.get('/api/user/info/alarmEmail/all', {
                headers: { token: token }
            })
                .then((response) => {
                    setAlarmEmails(response.data)
                })
                .catch((e) => { console.log(e) })
        }
    }, [])

    useEffect(() => {
        if (decodedToken.sub != "" || decodedToken.sub != undefined)
            setName(decodedToken.sub)
        if (decodedToken.email != "" || decodedToken.email != undefined)
            setEmail(decodedToken.email)
    }, [decodedToken])

    return (
        <NoGnbLayout title={"마이페이지"}>
            <Background>
                {
                    isModalShown && <SignOutModal/>
                }
                <HStack className=' mt-10 mb-5 gap-3'>
                    <Image src={profileIcon} alt="profile" width="60px" height="60px"></Image>
                    <div className={`text-left`}>
                        <Headline1>{name} 님</Headline1>
                        <Body1>{email}</Body1>
                    </div>
                    <div className=" absolute right-5 w-full top-12">
                        <BasicButton onClick={pushLogout}>로그아웃</BasicButton>
                    </div>
                </HStack>
                <Line color={"lightgrey"} />
                <div className="mt-5 mb-10">
                    <div className="h-min">
                        <Subhead2>가입정보</Subhead2>
                        <HStack style={{ marginTop: "23px" }}>
                            <Body1 className=" min-w-max h-min mr-3">이름</Body1>
                            {
                                !modify &&
                                <>
                                    <Subhead3 className="min-w-max">{name}</Subhead3>
                                    <div className="relative w-full right-0 bottom-5">
                                        <BasicButton onClick={() => { setModify(true) }}>수정</BasicButton>
                                    </div>
                                </>
                            }
                        </HStack>
                        {
                            modify
                                ?
                                <ModifyName
                                    name={name}
                                    onCancle={() => { setModify(false) }} />
                                :
                                <Description className="mt-3">약속 일정의 참여자들에게 보이는 이름이에요</Description>
                        }
                    </div>
                </div>
                <Line color={"lightgrey"} />
                <div className=" mt-10 mb-10">
                    <Subhead2>연동된 캘린더</Subhead2>
                    <HStack mt={"20px"} gap={"20px"}>
                        <Image src={unfilledKakaoIcon} alt="unfilled-kakao" />
                        <Image src={filledGoogleIcon} alt="unfilled-kakao" />
                        <Image src={unfilledAppleIcon} alt="unfilled-kakao" />
                        <Image src={unfilledNaverIcon} alt="unfilled-kakao" />
                        {/* <button className="leading-none">
                    </button> */}
                    </HStack>
                </div>
                <Line color={"lightgrey"} />
                <div className="mt-10 mb-10">
                    <Subhead2>알림 설정</Subhead2>
                    <Description style={{ marginBottom: "30px", marginTop: "8px" }}>약속 확정 시 등록된 메일로 알림을 보내드려요</Description>
                    {alarmEmails.map((alarmEmail, index) => {
                        return (<EmailAlarm
                            key={`alarm-email-${index}`}
                            alarmEmail={alarmEmail} />)
                    })}
                </div>
                <Line color={"lightgrey"} />
                <div className="mt-10 mb-10 text-left w-full">
                    <button className="block" onClick={pushPrivacyPolicy}>
                        <Body2>개인정보 처리 방침</Body2>
                    </button>
                    <button className="block mt-5" onClick={()=>{setIsModalShown(true)}}>
                        <Body2>회원 탈퇴</Body2>
                    </button>
                </div>
            </Background>
        </NoGnbLayout>
    )
}

export default MyPage