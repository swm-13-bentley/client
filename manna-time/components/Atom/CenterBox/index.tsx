import { Paper } from "@mui/material"
import { ReactNode } from "react"

interface ModalProps {
    children: ReactNode
    isShown: boolean
}

const CenterBox = ({children, isShown}: ModalProps) => {
    return (<Paper
        sx={{
            position: 'fixed',
            boxShadow: 2,
            paddingTop: "38px",
            paddingBottom: "30px",
            paddingRight: "24px",
            paddingLeft: "24px",
            maxWidth: 500,
            width: '80%',
            borderRadius: "16px",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            zIndex: 501,
        }}
        style={{ display: isShown ? 'block' : 'none' }}
    >
        {children}
    </Paper>)
}

export default CenterBox