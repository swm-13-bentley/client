import { FullButton } from "@/components/Atom/Button";
import { Caption } from "@/components/Atom/Letter";
import { Background } from "@/components/Layout/MainLayout/Wrapper";
import { BasicButtonContainer } from "@/components/Molecule/ButtonContainer";
import ParticipantInput from "@/components/Organism/ParticipantInput";
import { VStack } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const ParticipantLogin: NextPage = () => {
    const router = useRouter()
    const { qid, dayOnly } = router.query

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

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
                <FullButton onClick={sendLoginRequest}>내 일정 등록/수정하기</FullButton>
                <Caption className=" mt-4 mb-4">또는</Caption>
                <FullButton style="secondary">로그인/회원가입</FullButton>
            </BasicButtonContainer>

        </Background>
    )

    function sendLoginRequest() {
        let srcUrl = process.env.NEXT_PUBLIC_API_URL
        let pushPath = ""

        if (dayOnly == 'true') {
            srcUrl += '/day/room/' + qid + '/participant/entry'
            pushPath = `/${router.query.locale}/date/room/${qid}/${name}`
        }
        else {
            srcUrl += '/room/' + qid + '/participant/entry'
            pushPath = `/${router.query.locale}/room/${qid}/${name}`
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
                    router.push(pushPath);
                })
                .catch((e) => {
                    const status = e.response.status

                    if (status == 400)
                        setErrorMessage("약속 제한 인원을 초과하였습니다")
                    else if (status == 401)
                        setErrorMessage("이전에 등록한 비밀번호를 입력하세요")
                    else if (status == 404)
                        setErrorMessage("해당 약속이 존재하지 않습니다")
                        
                })
        }
    }
}

export default ParticipantLogin