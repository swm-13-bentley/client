import CenterFlexLayout from "@/components/Layout/CenterFlexLayout"
import styled from "@emotion/styled"
import { Paper } from "@mui/material"

const ModalCard = () => {

    const Section = styled.section`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 501;
    `

    return (<div>
        <Paper sx={{
            position: 'fixed',
            boxShadow: 2,
            padding: 3,
            maxWidth: 500,
            borderRadius: 3,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: 501,
        }}>
            <h1>hey</h1>
        </Paper>
    </div>)
}

export default ModalCard