import { changeDateFormat } from "@/utils/changeFormat"
import { Center, Circle, HStack } from "@chakra-ui/react"
import { Paper } from "@mui/material"

type Rank = {
    availableDate: string,
    participants: string[]
}

type Props = {
    ranks?: Rank[],
    totalNum: number
}

const DateRank = ({ ranks, totalNum }: Props) => {

    const topRank = ranks?.map((rank: Rank, index: number) => {
        return (
            <>
                <HStack key={index} className="md:pl-4">
                    <Circle size='21px' bg='#757ce8' color='white' mr="1">
                        <h2 className="text-white md:text-lg text-sm">{index + 1}</h2>
                    </Circle>
                    <p className="md:text-lg text-base font-normal">
                        {changeDateFormat(rank.availableDate)}
                        
                    </p>
                </HStack>
                <p className="md:text-base md:pl-3 pl-2 text-sm font-normal">
                    {rank.participants.join(', ')} <span className="md:text-lg text-base font-light font-"> - {rank.participants.length} / {totalNum}명</span>
                </p>
            </>
        )
    })

    return (
        <>
            <Paper
                sx={{
                    boxShadow: 0,
                    marginBottom:3,
                    marginTop: 3,
                    padding: 1,
                    width: '88vw',
                    borderRadius: 3,
                    backgroundColor: '#F4F4FC',
                    minWidth: "300"
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
                            <span>약속 가능한 날짜를 선택해주세요!</span>
                        </Center>
                }
            </Paper>
        </>
    )
}

export default DateRank