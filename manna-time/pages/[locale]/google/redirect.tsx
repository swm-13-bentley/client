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
    if (typeof (router.query.code) === 'string' && window.opener != null) {
        window.opener.postMessage(router.query.code)
        window.close()
    }
    
    return (<>
        <Board/>
    </>)
}

export default Redirect
