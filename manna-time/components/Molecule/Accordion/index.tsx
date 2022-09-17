import { BorderBox } from "@/components/Atom/Box"
import { FilterButton } from "@/components/Atom/Button"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled } from "@mui/material";

import { useState } from "react"

interface AccordionProps {
    children?: React.ReactNode,
    title: string,
    emphasizedTitle?: string
}

const Accordion = ({ children, title, emphasizedTitle }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const StyledButton = styled('button', {})`
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 160%;
        /* or 22px */
        
        letter-spacing: -0.003em;
        
        color: #333333;
    `

    const StyledSpan = styled('span', {})`
        font-family: 'Pretendard';
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 160%;
        /* or 22px */
        
        letter-spacing: -0.003em;
        
        color: #5194FF;
    `
    return (
        <BorderBox>
            <>
                <StyledButton className="w-full text-left" onClick={() => { setIsOpen(!isOpen) }}>
                    {title}
                    {emphasizedTitle != undefined && (
                        <StyledSpan>
                            {' ' + emphasizedTitle}
                        </StyledSpan>
                    )}
                    <KeyboardArrowDownIcon className="absolute right-8" />
                </StyledButton>
                    {
                    isOpen &&
                        <div className="flex flex-row space-x-1">
                            {children}
                        </div>
                    }
            </>
        </BorderBox>
    )
}

export default Accordion