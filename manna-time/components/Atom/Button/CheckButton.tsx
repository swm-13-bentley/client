import styled from "@emotion/styled"
import Image from "next/image"
import checkIcon from '@/public/icon/check.svg'

interface CheckButtonProps {
    children?: React.ReactNode
    checked: boolean
    onClick(): void
}

const CheckBox = styled.div`
box-sizing: border-box;

width: 24px;
height: 24px;

border: 1px solid #DDDDDD;
border-radius: 4px;
`

const FilledCheckBox = styled.div`
box-sizing: border-box;
display: flex;
justify-content: center;

width: 24px;
height: 24px;

background: #5194FF;
border-radius: 4px;
`

const BorderBox = styled.div`
box-sizing: border-box;

/* Auto layout */

display: flex;
flex-direction: row;
vertical-align: middle;
align-items: center;
padding: 12px 16px;

width: 100%;
height: 48px;
left: 20px;

background: #FFFFFF;
border: 1px solid #EEEEEE;
border-radius: 6px;
`

const CheckButton = ({ children, checked, onClick }: CheckButtonProps) => {

    return (
        <BorderBox>
            <button
                className="w-full text-left"
                onClick={onClick}
            >
                {children}
            </button>
            {
                checked
                    ?
                    <FilledCheckBox
                        className="absolute right-9"
                        onClick={onClick}
                    >
                        <Image style={{display:"block", padding:"auto"}} src={'/icon/check.svg'} alt="checked" width="15px" height="15px"/>
                    </FilledCheckBox>
                    :
                    <CheckBox
                        className="absolute right-9"
                        onClick={onClick}
                    />
            }
        </BorderBox>
    )
}

export default CheckButton