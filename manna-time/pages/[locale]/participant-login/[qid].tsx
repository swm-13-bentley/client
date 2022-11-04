import { FullButton } from "@/components/Atom/Button";
import { Caption } from "@/components/Atom/Letter";
import { Background } from "@/components/Layout/MainLayout/Wrapper";
import { BasicButtonContainer } from "@/components/Molecule/ButtonContainer";
import ParticipantInput from "@/components/Organism/ParticipantInput";
import { VStack } from "@chakra-ui/react";
import axios from "axios";
import _ from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { isLoggedInState } from "@/src/state/UserInfo";
import { useRecoilValue } from "recoil";

const ParticipantLogin: NextPage = () => {
    const router = useRouter()
    const { qid, dayOnly } = router.query

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const isLoggedIn = useRecoilValue(isLoggedInState)

    useEffect(() => {
        if (qid != undefined && isLoggedIn) {
            router.push(
                {
                    pathname: `/${router.query.locale}/enter-room`,
                    query: {
                        dayOnly: dayOnly == 'true' ? 'true' : 'false',
                        qid: qid
                    }
                },
                `/${router.query.locale}/enter-room`
            );
        }
    },[qid,dayOnly])

    return (
        <Background>
            <ParticipantInput
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                errorMessage={errorMessage}
            />
            <BasicButtonContainer marginTop={"10"}>
                <FullButton onClick={
                    //비동기 중복 처리 방지 grouping by 10 millisecond
                    _.debounce(sendLoginRequest, 10)}
                >입장하기</FullButton>
                <Caption className=" mt-4 mb-4">또는</Caption>
                <FullButton style="secondary"
                    onClick={() => {
                        router.push({
                            pathname: `/ko/login`,
                            query: {
                                redirect: `/ko/enter-room?qid=${qid}&dayOnly=${dayOnly=='true' ? 'true' : 'false'}`
                            }
                        },'/ko/login')
                    }}
                >로그인/회원가입</FullButton>
            </BasicButtonContainer>

        </Background>
    )

    function sendLoginRequest() {
        let srcUrl = process.env.NEXT_PUBLIC_API_URL
        let pushPath = ""

        if (dayOnly == 'true') {
            srcUrl += '/day/room/' + qid + '/participant/entry'
            pushPath = `/${router.query.locale}/date/room/${qid}`
        }
        else {
            srcUrl += '/room/' + qid + '/participant/entry'
            pushPath = `/${router.query.locale}/room/${qid}`
        }


        let sendFlag = (name != "")
        if (!sendFlag) {
            alert("이름을 입력해주세요.")
        }
        else {
            axios({
                method: 'post',
                url: srcUrl,
                data: {
                    "participantName": name,
                    "password": password
                }
            })
                .then((result) => {
                    router.push(
                        {
                            pathname: pushPath,
                            query: {
                                name: name
                            }
                        },
                        pushPath
                    );
                })
                .catch((e) => {
                    const status = e.response.status

                    if (status == 400)
                        setErrorMessage("약속 제한 인원을 초과하였습니다")
                    else if (status == 401)
                        setErrorMessage("이전에 등록한 비밀번호를 입력하세요")
                    else if (status == 402)
                        setErrorMessage("로그인으로 입장한 사용자입니다. 로그인을 진행하세요.")
                    else if (status == 404)
                        setErrorMessage("해당 약속이 존재하지 않습니다")

                })
        }
    }
}

export default ParticipantLogin