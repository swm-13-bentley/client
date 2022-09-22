import { StyledP, StyledSpan } from "@/components/Atom/Letter"
import Rank from "@/components/Molecule/Rank/Rank"
import { changeDateFormat, changeTimeFormat } from "@/utils/changeFormat"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"

type Rank = {
    count: number,
    availableDate: string,
    startTime: string,
    endTime: string,
    participantNames: string[]
}

interface RankContainerProps {
    ranks?: Rank[]
    totalNum: number
}

const StyledDiv = styled.div`
    max-width: 350px;
`

const RankContainer = ({ ranks, totalNum }: RankContainerProps) => {

    const rankItems = ranks?.map((rank, index) => {
        return (
            <Rank
                key={`rank-${index}`}
                rank={index + 1}
                time={`${changeDateFormat(rank.availableDate)} ${changeTimeFormat(rank.startTime)} ~ ${changeTimeFormat(rank.endTime)}`}
                participants={rank.participantNames} />
        )
    })

    return (
        <VStack className="mt-10 space-y-3">
            <StyledDiv className="flex flex-left space-y-3 w-full">
                <StyledP className=" mb-2 ">
                    <StyledSpan fontSize={"16px"} >총 {totalNum}명 </StyledSpan>
                    가능한 시간 순서예요
                </StyledP>
            </StyledDiv>
            {rankItems}
        </VStack>
    )
}

export default RankContainer