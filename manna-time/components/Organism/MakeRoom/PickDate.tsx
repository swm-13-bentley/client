import { InputBox } from "@/components/Atom/Box"
import { Body1, Headline2 } from "@/components/Atom/Letter"
import { VStack } from "@chakra-ui/react"
import { useState } from "react"
import { Calendar, DateObject, getAllDatesInRange } from "react-multi-date-picker"

interface PickDateProps {
    value: string[]
    setValue(value: string[]): void
}

const dateRangeFormat = "YYYY-MM-DD"

const PickDate = ({value, setValue} : PickDateProps) => {

    return (<>
        <VStack className="mt-12 mb-10">
            <Headline2 className="mb-4">날짜를 선택해주세요</Headline2>
            <Body1>특정 날짜 또는 기간을 선택할 수 있어요</Body1>
        </VStack>
        <Calendar className="rmdp-mobile" range value={value}
                    showOtherDays
                    onChange={(dateObjects) => {
                        if (dateObjects) {
                            let tmpArr = getAllDatesInRange(dateObjects as DateObject[])
                            let newDate: string[] = []
                            tmpArr.map((date) => { newDate.push((date as DateObject).format(dateRangeFormat)) })
                            setValue(newDate)
                        }
                    }}
                    mapDays={({ date }) => {
                        let props = {className:""}
                        let isWeekend = [0, 6].includes(date.weekDay.index)
                        
                        if (isWeekend) props.className = "highlight highlight-red"
                        
                        return props
                      }}
                    zIndex={1}
                />
    </>)
}

export default PickDate