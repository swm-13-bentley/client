import { CustomBox } from "@/components/Atom/Box"
import Line from "@/components/Atom/Line"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"

interface RoomInfoBoxProps {
    title: string
    date: string
    timeArea?: string
    participants: string[]
}

const StyledSpan = styled.span`
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    /* or 22px */

    letter-spacing: -0.003em;

    color: #333333;
`

const Title = styled.p`
    font-family: 'Pretendard';
    margin-bottom: 8px;
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 150%;
    /* identical to box height, or 27px */

    letter-spacing: -0.003em;

    color: #5194FF;
`

const Participant = styled.p`
    margin-top: 16px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 160%;
    /* or 22px */

    letter-spacing: -0.003em;

    color: #333333;
`

const Rectangle = styled.div`
    width: 4px;
    height: 4px;
    margin-right: 8px;
    margin-top: 9px;

    background: #333333;
`

const RoomInfoBox = ({ title, date, timeArea, participants }: RoomInfoBoxProps) => {

    const nameItem = participants.map((name, index) => {
        return (
            <StyledSpan
                key={index}
                className="mr-1 ml-1"
            >{name}</StyledSpan>
        )
    })
    return (
        <VStack mt="30px">
            <CustomBox
                style="skyblue"
            >
                <Title>{title}</Title>
                <div className="mb-1 flex flex-left">
                    <Rectangle /><StyledSpan> {date}</StyledSpan>
                </div>
                {
                    timeArea && (

                        <div className="mb-4 flex flex-left">
                            <Rectangle /><StyledSpan>{timeArea}</StyledSpan>
                        </div>
                    )

                }

                <Line color={"lightgrey"} />
                <Participant className="gap-2">참여자 {nameItem}</Participant>
            </CustomBox>
        </VStack>
    )
}

export default RoomInfoBox