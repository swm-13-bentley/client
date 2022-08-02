import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, Input, InputLabel, Paper, TextField, Typography, withStyles } from "@mui/material"
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { MixpanelTracking } from "@/utils/mixpanel";
import LoginIcon from '@mui/icons-material/Login';


interface Props{
    eventName: string,
    startDate: string,
    endDate: string
}

const ParticipantLogin = ({eventName, startDate, endDate}:Props) => {

    const router = useRouter()

    const { qid } = router.query
    // console.log(qid)

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    // console.log(userName, password)
    
    return (
        <main>
            <CssBaseline />
            <Paper sx={{ boxShadow: 4, padding: 3, maxWidth: 400, borderRadius: 3 }}>
                <Center mb="20">
                    <Avatar>
                    </Avatar>
                </Center>
                <Center mb="5">
                    <p className="text-lg font-bold">{eventName}</p>
                </Center>
                <Center mb="15">
                    <p className="text-sm font-bold">{startDate} ~ {endDate}</p>
                </Center>
                <Center>
                    <h1></h1>
                </Center>
                <form>
                    <FormControl margin="dense" required fullWidth>
                        <InputLabel className="md:text-md text-sm" >내 이름 (필수)</InputLabel>
                        <Input
                            onChange={(e) => { setUserName(e.target.value) }}
                            size="small"
                            id="myname"
                            name="myname"
                             />
                    </FormControl>
                    <FormControl margin="dense" fullWidth>
                        <InputLabel className="md:text-md text-sm" htmlFor="password">비밀번호 (선택)</InputLabel>
                        <Input
                            onChange={(e) => { setPassword(e.target.value) }}
                            size="small"
                            name="password"
                            type="password"
                            id="password"
                            // autoComplete="current-password"
                        />
                    </FormControl>
                    {/* <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    /> */}
                    <Center className="mt-5 mb-2">
                        {(
                            loginError
                            ?
                            <p className="text-xs font-bold text-red-600">이전에 입력하신 비밀번호를 입력해주세요!</p>
                            :
                            <p className="text-xs font-bold text-blue-700">회원가입이 필요없어요!</p>
                        )}
                    </Center>
                    <Button
                        className="mt-0"
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<LoginIcon />}
                        onClick={() => {
                            sendLoginRequest()
                            MixpanelTracking.getInstance().buttonClicked("비회원 로그인")
                        }}
                        sx ={{ borderRadius : 3 }}
                    >
                        내 시간 입력
                    </Button>
                </form>
            </Paper>
        </main>
    );

    function sendLoginRequest() {
        let srcUrl = process.env.NEXT_PUBLIC_API_URL + '/room/' + qid + '/participant/entry'
        // console.log(srcUrl)

        let sendFlag = (userName != "")
        if (!sendFlag) {
            alert("이름을 입력해주세요.")
        }
        else {
            axios({
                method: 'post',
                url: srcUrl,
                data: {
                    "participantName": userName,
                    "password": password
                }
            })
                .then((result) => {
                    setLoginError(false)
                    router.push(`/${router.query.locale}/room/${qid}/${userName}`);
                })
                .catch((e) => {
                    setLoginError(true)
                })
        }
    }
}

export default ParticipantLogin
// export default withStyles(styles)(Login);
