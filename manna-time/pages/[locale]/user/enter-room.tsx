import { Body1, Headline1, Headline2 } from "@/components/Atom/Letter"
import { isLoggedInState, tokenState } from "@/src/state/UserInfo"
import { VStack } from "@chakra-ui/react"
import { CircularProgress } from "@mui/material"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"

const EnterRoom = () => {
    const router = useRouter()
    const { qid, dayOnly, locale } = router.query
    const token = useRecoilValue(tokenState)
    const isLoggedIn = useRecoilValue(isLoggedInState)

    const redirectPage = () => {
        if (qid != undefined && locale != undefined)
            router.push(dayOnly == 'true' ? `/${locale}/date/room/${qid}` : `/${locale}/room/${qid}`)
    }

    useEffect(() => {
        if (qid != undefined && isLoggedIn) {
            if (dayOnly == 'true') {
                axios.post(`/api/user/date/${qid}/entry`, {},
                    { headers: { token: token } }
                )
                    .then((res) => {
                        // console.log(res)
                        redirectPage()
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            } else if (dayOnly == 'false' || dayOnly == undefined) {
                axios.post(`/api/user/time/${qid}/entry`, {},
                    { headers: { token: token } }
                )
                    .then((res) => {
                        // console.log(res)
                        redirectPage()
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        }
    }, [qid, dayOnly])

    return (<VStack mt="100px" gap="20px">
        <CircularProgress style={{color: "#5194FF"}} color="inherit"></CircularProgress>
        <Body1> 내 일정을 불러오는 중입니다...</Body1>
    </VStack>)
}

export default EnterRoom