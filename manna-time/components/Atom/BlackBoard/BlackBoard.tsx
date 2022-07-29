import { ScriptProps } from "next/script"
import styled from '@emotion/styled'
import { css } from "@emotion/react"
import { useState } from "react"

const BlackBoard = ({ children }: ScriptProps) => {

    const Board = styled.div`
    position: fixed;
    z-index: 500;
    inset: 0px;
    overflow-y: auto;
    pointer-events: initial;
    background-color: var(--ds-background-blanket,rgba(9,30,66,0.54));
    `
    
    return (
        <>
            <Board
            >
                {children}
            </Board>
        </>
    )
}

export default BlackBoard