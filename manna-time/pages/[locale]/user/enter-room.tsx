import { Body1, Headline1 } from "@/components/Atom/Letter"
import { isLoggedInState, tokenState } from "@/src/state/UserInfo"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useRecoilValue } from "recoil"

const EnterRoom = () => {
    const router = useRouter()
    const { qid, dayOnly, locale } = router.query
    const token = useRecoilValue(tokenState)

    useEffect(() => {
        if (qid != undefined && dayOnly != undefined && isLoggedInState) {
            if (dayOnly == 'true') {
                //todo : date 방에서 로그인 사용자 입장
            } else if (dayOnly == 'false') {
                axios.post(`/api/user/time/${qid}/entry`, {},
                    { headers: { token: token } }
                )
                    .then((res) => {
                        console.log(res.data)
                        
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        }
    }, [qid, dayOnly])

    return (<>
        <Headline1>입장하는 중입니다...</Headline1>
    </>)
}

export default EnterRoom