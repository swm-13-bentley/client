import BlackBoard from "@/components/Atom/BlackBoard/BlackBoard"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"

const Board = styled.div`
position: fixed;
z-index: 500;
inset: 0px;
overflow-y: auto;
pointer-events: initial;
background-color: var(--ds-background-blanket,rgba(255,255,255,1));
`

const Redirect = () => {
    const router = useRouter()

    // console.log('parent window : ', window.opener)
    if (typeof (router.query.accessToken) === 'string' && window.opener != null) {
        console.log(router.query.accessToken)
        window.opener.postMessage(router.query.accessToken)
        window.close()
    }

    //test code
    // if (window.opener != null) {
    //     let accessToken = "abcdefg"
    //     window.opener.postMessage(accessToken)
    //     // window.close()
    // }
    
    return (<>
        <Board/>
    </>)
}

export default Redirect
