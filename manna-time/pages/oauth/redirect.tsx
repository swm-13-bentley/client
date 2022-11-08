import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { useEffect } from "react"

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

    useEffect(() => {
        window.flutter_inappwebview?.callHandler('flutterClose');
    },[])

    if (typeof (router.query.accessToken) === 'string' && window.opener != null) {
        window.opener.postMessage(router.query.accessToken)
        window.close()
    }

    return (<>
        <Board/>
    </>)
}

export default Redirect
