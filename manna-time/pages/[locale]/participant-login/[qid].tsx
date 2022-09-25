import { FullButton } from "@/components/Atom/Button";
import { Caption } from "@/components/Atom/Letter";
import ParticipantInput from "@/components/Organism/ParticipantInput";
import { VStack } from "@chakra-ui/react";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const ParticipantLogin: NextPage = () => {
    const router = useRouter()
    const { qid } = router.query

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    return (
        <VStack className=" gap-10">
            <ParticipantInput
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                errorMessage={errorMessage}
            />
            
            <VStack className="w-full">
                <FullButton onClick={sendLoginRequest}>내 일정 등록/수정하기</FullButton>
                <Caption className=" mt-4 mb-4">또는</Caption>
                <FullButton style="secondary">로그인/회원가입</FullButton>
            </VStack>

        </VStack>
    )

    function sendLoginRequest() {
        let srcUrl = process.env.NEXT_PUBLIC_API_URL + '/room/' + qid + '/participant/entry'

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
                    router.push(`/${router.query.locale}/room/${qid}/${name}`);
                })
                .catch((e) => {
                    setErrorMessage("에러가 발생했습니다") // todo: 에러별로 쪼개기
                })
        }
    }
}

export default ParticipantLogin