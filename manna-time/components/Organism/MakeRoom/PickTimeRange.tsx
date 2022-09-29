import { CheckButton } from "@/components/Atom/Button"
import { Body1, Body2, Headline2 } from "@/components/Atom/Letter"
import Accordion from "@/components/Molecule/Accordion"
import TimeRangeSelectbox from "@/components/Molecule/TimeRangeSelectbox/TimeRangeSelectbox"
import getIndexOfTrue from "@/utils/getIndexOfTrue"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import _ from "lodash"
import Image from "next/image"
import { useEffect, useState } from "react"

interface PickTimeRangeProps {
    setValue(value: string[] | 'date-only'): void
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

const time = [
    ['07:00:00', '12:00:00'],
    ['12:00:00', '18:00:00'],
    ['18:00:00', '24:00:00']
]

const PickTimeRange = ({setValue}:PickTimeRangeProps) => {
    const [checked, setChecked] = useState([false, false, false, false, false])
    const [manualTimeRange, setManualTimeRange] = useState(["09:00:00", "17:00:00"])

    
    const onClick = (index: number) => {
        let newChecked = [...checked]
        
        //약속 날짜, 직접입력의 경우 나머지 false 처리
        if (index === 3 || index === 4) {
            newChecked = new Array(checked.length).fill(false)
        } else {
            newChecked[3] = false
            newChecked[4] = false
        }
        newChecked[index] = !checked[index]
        setChecked(newChecked)
        setValue(getSelectedTime(newChecked))
    }
    
    const getSelectedTime = (arr: boolean[]) => {
        if (arr[3] == true) 
        return 'date-only'
        else if (arr[4] == true)
        return manualTimeRange
        // 오후만 비어있는 경우
        else if (_.isEqual(arr, [true, false, true, false, false]) || _.isEqual(arr,[false, false, false, false, false]) ) 
            return []
        else {
            const index = getIndexOfTrue(arr)
            
            const startTimeIndex = index[0]
            const endTimeIndex = index[index.length-1]
            return [time[startTimeIndex][0], time[endTimeIndex][1]]
        }
    }

    useEffect(() => {
        setValue(getSelectedTime(checked))
    },[manualTimeRange])


    return (
        <>
            <VStack className="mt-12 mb-10">
                <Headline2 className="mb-4">시간대를 선택해주세요</Headline2>
                <Body1>가능한 시간대를 복수로 선택할 수 있어요</Body1>
            </VStack>
            <VStack className="w-full space-y-2">
                <CheckButton
                    checked={checked[0]}
                    onClick={() => { onClick(0) }}
                >
                    <Image style={{ marginTop: "4px", marginRight: "8px" }} src="/images/icon/morning.svg" alt="ic_morning" layout="intrinsic" width="20px" height="20px" />
                    <StyledSpan> 아침 (7:00 ~ 12:00)</StyledSpan>
                </CheckButton>
                <CheckButton
                    checked={checked[1]}
                    onClick={() => { onClick(1) }}
                >
                    <Image style={{ marginTop: "4px", marginRight: "8px" }} src="/images/icon/afternoon.svg" alt="ic_afternoon" width="20px" height="20px" />
                    <StyledSpan> 오후 (12:00 ~ 18:00)</StyledSpan>
                </CheckButton>
                <CheckButton
                    checked={checked[2]}
                    onClick={() => { onClick(2) }}
                >
                    <Image style={{ marginTop: "4px", marginRight: "8px" }} src="/images/icon/evening.svg" alt="ic_afternoon" width="20px" height="20px" />
                    <StyledSpan> 저녁 (18:00 ~ 24:00)</StyledSpan>
                </CheckButton>
                <CheckButton
                    checked={checked[3]}
                    onClick={() => { onClick(3) }}
                >
                    <StyledSpan>약속 날짜만 정하면 돼요</StyledSpan>
                </CheckButton>
                <CheckButton
                    checked={checked[4]}
                    onClick={() => { onClick(4) }}
                >
                    <StyledSpan>직접 입력할게요</StyledSpan>
                </CheckButton>
                {
                    <div className={checked[4]?"w-full":"hidden"}>
                        <TimeRangeSelectbox
                            onSelectChange={(selected) => {
                                setManualTimeRange(selected)
                            }}
                        />
                    </div>
                }
            </VStack>
        </>
    )
}

export default PickTimeRange