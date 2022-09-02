import React, { useState } from "react";
import PropTypes from "prop-types";
import { Avatar, Button, Checkbox, CssBaseline, FormControl, FormControlLabel, Input, InputLabel, Paper, TextField, Typography, withStyles } from "@mui/material"
import { Center } from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { MixpanelTracking } from "@/utils/mixpanel";
import LoginIcon from '@mui/icons-material/Login';
import { StringIfPlural } from "react-i18next";
import { useRecoilState } from "recoil";
import BlackBoard from "../BlackBoard/BlackBoard";
import { DateOnlyLoginState } from "@/src/state";

interface ReturnType {
    promise: Promise<void> | Promise<AxiosResponse<any, any> | undefined>,
    errorText: string
}

interface Props {
    onConfirm(name: string, password?: string): ReturnType
}

const DateOnlyCard = ({ onConfirm }: Props) => {
    
    const [isShown, setIsShown] = useRecoilState(DateOnlyLoginState)
    
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(false)
    const [errorText, setErrorText] = useState("")

    return (
        <main>
            <CssBaseline />
            <BlackBoard
                isShown={isShown}
                onClick={() => { setIsShown(false) }}
            />
            <Paper
                sx={{
                    position: 'fixed',
                    boxShadow: 2,
                    padding: 3,
                    maxWidth: 500,
                    width: '80%',
                    borderRadius: 3,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    zIndex: 501,
                }}
                style={{ display: isShown ? 'block' : 'none' }}
            >
                <Center mb="20">
                    <Avatar>
                    </Avatar>
                </Center>
                <form>
                    <FormControl margin="dense" required fullWidth>
                        <InputLabel className="md:text-md text-sm" >내 이름 (필수)</InputLabel>
                        <Input
                            onChange={(e) => { setUserName(e.target.value) }}
                            size="small"
                            id="myname"
                            name="myname"
                            autoFocus
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
                    <Center className="mt-5 mb-2">
                        {(
                            loginError
                                ?
                                <p className="text-xs font-bold text-red-600">{errorText}</p>
                                :
                                <p className="text-xs font-bold text-blue-700">회원가입이 필요없어요!</p>
                        )}
                    </Center>
                    <Button
                        className="mt-0"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            const result = onConfirm(userName, password)
                            result.promise.then((result) => {
                                if (result != undefined) {
                                    setLoginError(false)
                                    setIsShown(false)
                                }
                            })
                                .catch((e) => {
                                    setErrorText(result.errorText)
                                    setLoginError(true)
                                })
                            MixpanelTracking.getInstance().buttonClicked("date: 비회원 로그인 확인")
                        }}
                        sx={{ borderRadius: 3 }}
                    >
                        확인
                    </Button>
                </form>
            </Paper>
        </main>
    );
}

export default DateOnlyCard
