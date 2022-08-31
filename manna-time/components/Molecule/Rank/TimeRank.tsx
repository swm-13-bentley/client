import { changeDateFormat, changeTimeFormat } from "@/utils/changeFormat"
import { Center, Circle, HStack } from "@chakra-ui/react"
import { Paper } from "@mui/material"
import { ScriptProps } from "next/script"

type Rank = {
    count: number,
    availableDate: string,
    startTime: string,
    endTime: string,
    participantNames: string[]
}

type Props = {
    ranks?: Rank[],
    totalNum: number
}

const TimeRank = ({ ranks, totalNum }: Props) => {
    const topRank = ranks?.map((rank: Rank, index: number) => {
        return (
            <>
                <HStack key={index} className="md:pl-4">
                    <Circle size='21px' bg='#757ce8' color='white' mr="1">
                        <h2 className="text-white md:text-lg text-sm">{index + 1}</h2>
                    </Circle>
                    <p className="md:text-lg text-base font-normal">
                        {changeDateFormat(rank.availableDate)} {changeTimeFormat(rank.startTime)}-{changeTimeFormat(rank.endTime)}
                    </p>
                    <span className="md:text-sm text-xs font-normal">({rank.count} / {totalNum}명)</span>
                </HStack>
                <p className="md:text-base md:pl-3 pl-2 text-sm font-normal">
                    {rank.participantNames.join(', ')}
                </p>
            </>
        )
    })

    return (
        <>
            <Paper
                sx={{
                    boxShadow: 0,
                    margin: 3,
                    padding: 1,
                    width: '100%',
                    borderRadius: 3,
                    backgroundColor: '#F4F4FC'
                }}
            >
                {
                    (ranks && ranks.length != 0)
                        ?
                        <div className="m-5 space-y-3">
                            {topRank}
                        </div>
                        :
                        <Center>
                            <span>약속 가능한 시간을 입력해주세요!</span>
                        </Center>
                }
            </Paper>
        </>
    )
}

export default TimeRank