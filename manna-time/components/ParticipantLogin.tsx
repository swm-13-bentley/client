import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, Input, InputLabel, Paper, TextField, Typography, withStyles } from "@mui/material"
import { Center } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";

function ParticipantLogin() {

    const router = useRouter()

    const { qid } = router.query
    // console.log(qid)

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    // console.log(userName, password)
    
    return (
        <main>
            <CssBaseline />
            <Paper sx={{boxShadow: 4, padding: 3, maxWidth: 400}}>
                <Center mb="20">
                    <Avatar>
                    </Avatar>
                </Center>
                <Center mb="5">
                    <p className="text-xl font-bold">약속 이름</p>
                </Center>
                <Center mb="5">
                    <p className="text-lg font-bold">약속 시간</p>
                </Center>
                <Center mb="15">
                    <p className="text-xs font-bold text-blue-700">회원가입이 필요없어요!</p>
                </Center>
                <Center>
                    <h1></h1>
                </Center>
                <form>
                    <FormControl margin="dense" required fullWidth>
                        <InputLabel className="md:text-md text-sm" >내 이름</InputLabel>
                        <Input
                            onChange={(e) => { setUserName(e.target.value) }}
                            size="small"
                            id="myname"
                            name="myname"
                            autoFocus />
                    </FormControl>
                    <FormControl margin="dense" required fullWidth>
                        <InputLabel className="md:text-md text-sm" htmlFor="password">비밀번호</InputLabel>
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
                    <Button
                        className="mt-5"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={sendLoginRequest}
                    >
                        약속시간 정하기
                    </Button>
                </form>
            </Paper>
        </main>
    );

    function sendLoginRequest() {
        let srcUrl = process.env.NEXT_PUBLIC__API_URL + '/room/' + qid + '/participant/entry'
        // console.log(srcUrl)

        let sendFlag = (userName != "" && password !="")
        if (!sendFlag) {
            alert("이름과 비밀번호를 입력해주세요.")
        }
        else {
            axios({
                method: 'post',
                url: srcUrl,
                data: {
                    "username": userName,
                    "password": password
                }
            })
                .then((result) => {
                    console.log(result)
                })
                .catch((e) => { console.log(e) })
        }
    }
}

export default ParticipantLogin
// export default withStyles(styles)(Login);
