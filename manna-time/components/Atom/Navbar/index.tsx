import styled from "@emotion/styled";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export const NavbarWrapper = styled.div`
box-sizing: border-box;

position: fixed;
width: 100%;
height: 56px;
left: 0px;
top: 0px;

background: #FFFFFF;
border-bottom: 1px solid #EEEEEE;
z-index: 10;
`

interface PopUpNavbarProps {
    onClose(): void
}

export const PopUpNavbar = ({onClose}:PopUpNavbarProps) => {
    return (
        <NavbarWrapper>
            <IconButton
                sx={{ position: "fixed", right: "8px", top: "8px" }}
                onClick={onClose}
            >
                <CloseIcon sx={{ color: "#333333" }} fontSize="medium"/>
            </IconButton>
        </NavbarWrapper>
    )
}