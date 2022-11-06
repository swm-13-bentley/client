import styled from "@emotion/styled";
import plusGreyIcon from "@/public/icons/plus_grey.svg"
import plusBlackIcon from "@/public/icons/plus_black.svg"
import minusGreyIcon from "@/public/icons/minus_grey.svg"
import minusBlackIcon from "@/public/icons/minus_black.svg"
import Image from "next/image";

const GreyButton = styled.button`
    position: relative;
    width: 30px;
    height: 30px;
    padding: 3px;

    background: #F7F7F7;
    border-radius: 4px;
`

const Frame = styled.div`
    position: relative;
    width: 24px;
    height: 24px;
`

const PlusMinusButton = ({ style, disabled, onClick }: { style: 'plus' | 'minus', disabled: boolean, onClick: () => void }) => {
    if (disabled) {
        return (
            <GreyButton disabled>
                <Frame>
                    {
                        style == 'plus'
                            ?
                            <Image src={plusGreyIcon} alt="plus-grey" />
                            :
                            <Image src={minusGreyIcon} alt="minus-grey" />
                    }
                </Frame>
            </GreyButton>
        )
    } else {
        return (
            <GreyButton onClick={onClick}>
                <Frame>
                    {
                        style == 'plus'
                            ?
                            <Image src={plusBlackIcon} alt="plus-black" />
                            :
                            <Image src={minusBlackIcon} alt="minus-black" />
                    }
                </Frame>
            </GreyButton>
        )
    }
}

export default PlusMinusButton