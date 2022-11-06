import styled from "@emotion/styled"
import { IconButton } from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from "next/router";

interface NoGnbProps {
    title: string
    children: React.ReactNode
    redirect?: string
}

const Navbar = styled.div`
position: fixed;
width: 100%;
height: 56px;
left: 0px;
top: 0px;
z-index: 100;

display: flex;
align-items: center;
justify-content: center;
background: #FFFFFF;
border-bottom: 1px solid #EEEEEE;
`

const Title = styled.p`
font-family: 'Pretendard';
font-style: normal;
font-weight: 500;
font-size: 16px;
line-height: 150%;
/* identical to box height, or 24px */

letter-spacing: -0.003em;

color: #333333;
`

const NoGnbLayout = ({title, children, redirect}: NoGnbProps) => {
    const router = useRouter()

    return (<>
        <Navbar>
            <IconButton
                sx={{ position: 'fixed', left: '15px' }}
                onClick={() => {
                    if (redirect != undefined)
                        router.push(redirect)
                    else
                        router.back()
                }}
            >
                <ArrowBackIosNewIcon sx={{ color: "#333333" }} fontSize="small" />
            </IconButton>

            <Title>{title}</Title>
        </Navbar>
        <div style={{ marginTop: "56px", position: "relative" }}>
            {children}
        </div>
    </>)
}

export default NoGnbLayout