import { StyledP, StyledSpan } from "@/components/Atom/Letter"
import Rank from "@/components/Molecule/Rank/Rank"
import { changeDateFormat, changeTimeFormat } from "@/utils/changeFormat"

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

const RankContainer = ({ ranks, totalNum }: RankContainerProps) => {
    
    const rankItems = ranks?.map((rank, index) => {
        return (
            <Rank
                key = {`rank-${index}`}
                rank={index + 1}
                time={`${changeDateFormat(rank.availableDate)} ${changeTimeFormat(rank.startTime)} ~ ${changeTimeFormat(rank.endTime)}`}
                participants={rank.participantNames} />
        )
    })

    return (<div className=" mt-10 space-y-3">
        <StyledP className=" mb-2">
            <StyledSpan>총 {totalNum}명 </StyledSpan>
            가능한 시간 순서예요
        </StyledP>
        {rankItems}
    </div>)
}

export default RankContainer