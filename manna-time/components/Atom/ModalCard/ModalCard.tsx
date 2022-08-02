import CenterFlexLayout from "@/components/Layout/CenterFlexLayout"
import { Center, HStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, Input, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from '@mui/styles'
interface Props {
    isShown: boolean,
    onCancle(): void
}

const useStyles = makeStyles(() => ({
    formControlLabel: { fontSize: "15px" }
}));


const ModalCard = ({ isShown, onCancle }: Props) => {

    const style = useStyles()
    const [type, setType] = useState('')
    const [feedbackText, setFeedbackText] = useState('')
    const [isEmailChecked, setIsEmailChecked] = useState(false)
    const [email, setEmail] = useState('')


    const handleChange = (e: SelectChangeEvent) => {
        setType(e.target.value)
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFeedbackText(e.target.value)
    }

    const label = ["개선사항 제안", "버그 보고", "질문하기"]
    const menuItem = label.map((text, index) => {
        return (
            <MenuItem
                key={`menu-${index}`}
                value={text}
            >{text}</MenuItem>
        )
    })



    return (<div>
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
            <p className="md:text-xl text-sm font-bold mb-3">
                언제만나가 더 좋은 서비스로 보답할 수 있게, <br />
                <span className="md:text-xl text-sm font-bold text-blue-700">{" 피드백을 남겨주세요!"}</span>
            </p>
            <Center className="mb-3">
                <FormControl sx={{ width: '100%' }} size="small">
                    <Select
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        value={type}
                    >
                        {menuItem}
                    </Select>
                    {/* <FormHelperText>유형을 선택해주세요.</FormHelperText> */}
                </FormControl>
            </Center>
            <div
                style={{ display: type ? 'block' : 'none' }}
            >
                <Center className="mb-3">
                    <TextField
                        inputProps={{ maxLength: 200 }}
                        id="filled-multiline-static"
                        label="해당 란을 작성해주세요"
                        sx={{ width: '100%' }}
                        multiline
                        rows={8}
                        variant="filled"
                        value={feedbackText}
                        onChange={handleInputChange}
                    />
                </Center>
                <div className="mb-3">
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={isEmailChecked} onChange={(event: React.ChangeEvent<HTMLInputElement>)=>{setIsEmailChecked(event.target.checked)}} size="small" />}
                            label={
                            <Typography className={style.formControlLabel}>이메일로 답장을 받고 싶습니다</Typography>
                        } />
                    </FormGroup>
                    <Input
                        autoFocus
                        fullWidth
                        type="email"
                        id="email"
                        name="email"
                        // label="이메일 주소"
                        placeholder="abc@abc.net"
                        size="small"
                        disabled = {!isEmailChecked}
                        // error={emailError !== '' || false}
                    />
                </div>
                <Center className="space-x-3">
                    <Button
                        variant="outlined"
                        onClick={onCancle}
                    >
                        취소
                    </Button>
                    <Button
                        endIcon={<SendIcon />}
                        variant="contained"
                        onClick={() => {
                            onSubmit()
                        }}
                    >
                        보내기
                    </Button>

                </Center>
            </div>
        </Paper>
    </div>)

    function onSubmit() {
        if (feedbackText == '') {
            alert("내용을 입력해주세요")
            return
        }

        let emailText=''
        if (isEmailChecked)
            emailText = email

        const srcUrl = process.env.NEXT_PUBLIC_API_URL + '/feedback'
        axios({
            method: 'post',
            url: srcUrl,
            data: {
                "type": type,
                "content": feedbackText,
                "email": emailText
            }
        })
            .then((result) => {
                alert("전달 완료! 더 발전하는 '언제만나'가 되겠습니다 감사합니다🙇‍♂️")
                onCancle()
            })
            .catch((e) => {
                alert("네트워크 에러: 전송 실패")
            })
    }
}

export default ModalCard