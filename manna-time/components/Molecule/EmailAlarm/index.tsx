import { Body1 } from "@/components/Atom/Letter"
import smallGoogleIcon from "@/public/icons/calendarLogo/small/google.svg"
import { HStack } from "@chakra-ui/react"
import Image from "next/image"
import Switch from '@mui/material/Switch';
import { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "@/src/state/UserInfo";
import { MixpanelTracking } from "@/utils/sdk/mixpanel";

export interface AlarmEmail {
    email: string
    receiveEmail: boolean
}

const EmailAlarm = ({ alarmEmail }: { alarmEmail: AlarmEmail }) => {
    const [checked, setChecked] = useState(alarmEmail.receiveEmail)
    const token = useRecoilValue(tokenState)

    const sendRequest = (status: boolean) => {
        axios.patch('/api/user/info/alarmEmail/status',
            {
                email: alarmEmail.email,
                receiveEmail: status
            },
            { headers: { token: token } }
        )
            .then((response) => {
                // console.log(response)
            })
            .catch((e) => {
                // console.log(e)
            })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        MixpanelTracking.getInstance().track("my-page: 알림 설정 라디오",{checked: event.target.checked, email: alarmEmail.email})  
        setChecked(event.target.checked);
        sendRequest(event.target.checked)
    };

    return (
        <HStack>
            <Image src={smallGoogleIcon} alt="google-icon" />
            <Body1>{alarmEmail.email}</Body1>
            <Switch className="absolute right-3"
                checked={checked}
                onChange={handleChange}
            />
        </HStack>
    )
}

export default EmailAlarm