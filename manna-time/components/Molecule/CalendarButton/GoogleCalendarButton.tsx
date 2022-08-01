import { Button } from "@mui/material"
import { NextPage } from "next"
import { useEffect, useState } from "react"

const GoogleCalendarButton = () => {
    const srcUrl = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?access_type=offline&scope=profile%20email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fgoogle%2Fredirect&client_id=1089339257767-8rqr5aicc05veuh76584pbf3el7cqvhk.apps.googleusercontent.com&flowName=GeneralOAuthFlow'
    const [googleAuth, setGoogleAuth] = useState('')

    useEffect(() => {
        //SSR이기 때문에 window객체가 undefined로 설정. -> DOM 형성 후 실행이 되는 useEffect 사용해야 함
        window.addEventListener("message", (event) => {
            setGoogleAuth(event.data)
            console.log(event.data)
        }, false)
    }, [])
    
    return (<>
        <Button
            onClick={()=>{window.open(srcUrl,"self",'popup')}}
        >
            sdfsf
        </Button>
    </>)
}

export default GoogleCalendarButton