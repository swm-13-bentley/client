import { InputBox } from "@/components/Atom/Box"
import { FullButton } from "@/components/Atom/Button"
import { tokenState } from "@/src/state/UserInfo"
import { HStack, VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import axios from "axios"
import { useState } from "react"
import { useRecoilState } from "recoil"

const Description = styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;

    letter-spacing: -0.3px;
    color: #999999;
`

const ModifyName = ({ name, onCancle }: { name: string, onCancle: () => void }) => {
    const [newName, setNewName] = useState(name)
    const [token, setToken] = useRecoilState(tokenState)

    const onSubmit = () => {
        axios.patch('/api/user/info/name',
            { name: newName },
            {
                headers: {
                    token: token
                }
            }
        )
            .then((response) => {
                setToken(response.data.newJwtToken)
                onCancle()
            })
            .catch((e) => { console.log(e) })
    }

    return (<VStack style={{ marginTop: "8px", textAlign:"left" }}>
        <InputBox
            placeholder={"김언제"}
            id={"modify-name"}
            setValue={setNewName}
            value={newName}
        />
        <Description style={{ marginTop: "8px", marginBottom: "20px", width: "100%", maxWidth: "350px" }}>
            다른 참여자가 나를 알아볼 수 있도록 작성해주세요 (최대 15자)
        </Description>
        <HStack style={{maxWidth:"350px", width:"100%"}}>
            <div className="w-2/5">
                <FullButton
                    onClick={onCancle}
                    style="white-black"
                    size="small"
                >취소</FullButton>
            </div>
            <FullButton
                style={newName == "" || newName == name ? 'disabled' : 'primary'}
                onClick={onSubmit}
                size="small"
            >수정 완료</FullButton>
        </HStack>

    </VStack>)
}

export default ModifyName