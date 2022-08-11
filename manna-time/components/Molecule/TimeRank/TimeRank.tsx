import { Center, Circle, HStack } from "@chakra-ui/react"
import { Paper } from "@mui/material"
import { ScriptProps } from "next/script"

type Rank = {
    count: number,
    availableDate: string,
    startTime: string,
    endTime: string
}

type Props = {
    ranks?: Rank[]
}

const dayOfTheWeek = ['일', '월', '화', '수', '목', '금', '토']

const changeDateFormat = (yyyymmdd: string) => {
    const date = new Date(yyyymmdd)
    let changedDate = yyyymmdd.substring(5).replace('-', '.') + `(${dayOfTheWeek[date.getDay()]})`
    return changedDate
}

const changeTimeFormat = (hhmmss: string) => {
    return hhmmss.substring(0, 5)
}

const TimeRank = ({ ranks }: Props) => {

    const topRank = ranks?.map((rank: Rank, index: number) => {
        return (
            <>
                <HStack key={index} className="md:pl-4">
                    <Circle size='21px' bg='#757ce8' color='white' mr="1">
                        <h2 className="text-white md:text-lg text-sm">{index + 1}</h2>
                    </Circle>
                    <p className="md:text-lg text-sm font-normal">
                        {changeDateFormat(rank.availableDate)} {changeTimeFormat(rank.startTime)}-{changeTimeFormat(rank.endTime)} :
                        <span className="md:text-lg text-sm font-light"> {rank.count}명</span>
                    </p>
                </HStack>
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