import styled from "@emotion/styled"
import { useRouter } from "next/router"

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

    if (typeof (router.query.accessToken) === 'string' && window.opener != null) {
        window.opener.postMessage(router.query.accessToken)
        window.close()
    }

    return (<>
        <Board/>
    </>)
}

export default Redirect
