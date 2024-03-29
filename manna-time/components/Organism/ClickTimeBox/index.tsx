import { CustomBox } from "@/components/Atom/Box"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"

interface ClickTimeBoxProps {
    time?: string
    participants?: string[]
}

const StyledSpan = styled.span`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */

    letter-spacing: -0.003em;

    color: #5194FF;
`

const StyledP = styled.p`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */

    letter-spacing: -0.003em;

    color: #333333;
`

const ClickTimeBox = ({ time, participants }: ClickTimeBoxProps) => {

    return (
        <VStack mt="24px">
            <CustomBox
                style="secondary"
                gap= "8px"
            >
                <StyledP>
                    {time != '' && time != undefined ? "" : '궁금한 시간을 '}
                    <StyledSpan>{time != '' && time != undefined ? time : '터치'}</StyledSpan>
                    {time != '' && time != undefined ? "에 가능한 사람은?" : '해보세요'}
                </StyledP>
                {
                    (participants!=undefined && participants.length>0) && (
                        <StyledP>{participants.join(' ')}</StyledP>
                    )
                }
            </CustomBox>
        </VStack>)
}

export default ClickTimeBox