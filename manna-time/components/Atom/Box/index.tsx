import useIsClient from "@/hooks/useIsClient"
import { Box, styled } from "@mui/system"
import { getEventListeners } from "events"
import { useEffect, useState } from "react"

interface BoxProps {
    style?: 'primary' | 'secondary' | 'skyblue'
    children?: React.ReactNode
    gap?: string
}

const theme = {
    primary: '#5194FF',
    secondary: '#F7F7F7',
    skyblue: '#F4F8FF'
}

const CustomBox = ({ style, children, gap }: BoxProps) => {
    const StyledBox = styled(Box, {
        name: 'box'
    })`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 350px;
    padding: 20px 20px;

    background: ${style && theme[style]};
    gap: ${gap};
    border-radius: 6px;
    `

    return <StyledBox>{children}</StyledBox>
}

const BorderBox = ({ children }: BoxProps) => {
    const StyledBox = styled(Box, {
        name: 'border-box'
    })`
    box-sizing: border-box;

    /* Auto layout */

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px 16px;
    gap: 10px;

    width: 100%;

    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    border-radius: 6px;
    white-space: normal;
    `
    return <StyledBox>
        {children}
    </StyledBox>
}

const StyledInput = styled('input', {})`

    padding: 12px 16px;
    border: 1px solid #DDDDDD;
    border-radius: 6px;
    white-space: normal;


    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 160%;
    /* or 22px */

    letter-spacing: -0.003em;
    color: #333333;

    width: 100%;
    max-width: 350px;

    ::placeholder {
        color: #999999;
    }

    &:focus {
        outline: none;
    }
`

interface InputBoxProps {
    placeholder: string
    id: string
    setValue(value: string): void
    value: string
}

const getHeight = () => window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

const InputBox = ({ placeholder, id, setValue, value }: InputBoxProps) => {
    const [initialInnerHeight, setInitialInnerHeight] = useState(0)

    // 보이는 창이 길어지면, input에다 focus 걸어서 다음 Button 보이게 함
    function handleResize() {
        // if (innerHeight > window.innerHeight)
        //     document.querySelector('input')?.focus()
        if (initialInnerHeight <= window.innerHeight)
            document.querySelector('input')?.blur()
    }

    useEffect(() => {
        setInitialInnerHeight(getHeight())
    }, [])

    useEffect(() => {
        if (initialInnerHeight > 0)
            window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [initialInnerHeight])

    if (id === 'password') {
        return <StyledInput
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
            size={350}
            maxLength={20}
            placeholder={placeholder}
            type="password"
            id={id}
            name={id}
        />
    } else {
        return <StyledInput
            value={value}
            onChange={(e) => {
                setValue(e.target.value)
            }}
            size={350}
            maxLength={15}
            placeholder={placeholder}
            type="text"
            id={id}
            name={id}
            onKeyDown={(event) => {
                if (event.key == 'Enter')
                    document.querySelector('input')?.blur();
            }}
            onFocus={() => {
                const nextButton = document.getElementById('next-button-container')
                if (nextButton) {
                    nextButton.style.visibility = 'hidden'
                }
            }}
            onBlur={() => {
                const nextButton = document.getElementById('next-button-container')
                if (nextButton) {
                    nextButton.style.visibility = 'visible'
                }
            }}
            required
        />
    }
}

export { CustomBox, BorderBox, InputBox }