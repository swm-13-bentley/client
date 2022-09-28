import { CheckButton } from "@/components/Atom/Button"
import { Body1, Body2, Headline2 } from "@/components/Atom/Letter"
import Accordion from "@/components/Molecule/Accordion"
import { VStack } from "@chakra-ui/react"
import styled from "@emotion/styled"
import Image from "next/image"
import { useState } from "react"


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

const PickTimeRange = () => {

    const [checked, setChecked] = useState([false, false, false, false, false])

    const check = (index: number) => {
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
    }
    return (
        <>
            <VStack className="mt-12 mb-10">
                <Headline2 className="mb-4">시간대를 선택해주세요</Headline2>
                <Body1>가능한 시간대를 복수로 선택할 수 있어요</Body1>
            </VStack>
            <VStack className="w-full space-y-2">
                <CheckButton
                    checked={checked[0]}
                    onClick={() => { check(0) }}
                >
                    <Image style={{ marginTop: "4px", marginRight: "8px" }} src="/images/icon/ic_morning.svg" alt="ic_morning" layout="intrinsic" width="20px" height="20px" />
                    <StyledSpan> 아침 (7:00 ~ 12:00)</StyledSpan>
                </CheckButton>
                <CheckButton
                    checked={checked[1]}
                    onClick={() => { check(1) }}
                >
                    <Image style={{ marginTop: "4px", marginRight: "8px" }} src="/images/icon/ic_afternoon.svg" alt="ic_afternoon" width="20px" height="20px" />
                    <StyledSpan> 오후 (12:00 ~ 18:00)</StyledSpan>
                </CheckButton>
                <CheckButton
                    checked={checked[2]}
                    onClick={() => { check(2) }}
                >
                    <Image style={{ marginTop: "4px", marginRight: "8px" }} src="/images/icon/ic_evening.svg" alt="ic_afternoon" width="20px" height="20px" />
                    <StyledSpan> 저녁 (18:00 ~ 24:00)</StyledSpan>
                </CheckButton>
                <CheckButton
                    checked={checked[3]}
                    onClick={() => { check(3) }}
                >
                    <StyledSpan>약속 날짜만 정하면 돼요</StyledSpan>
                </CheckButton>
                <CheckButton
                    checked={checked[4]}
                    onClick={() => { check(4) }}
                >
                    <StyledSpan>직접 입력할게요</StyledSpan>
                </CheckButton>
                {
                    checked[4] && (
                        <Accordion title={"hi"}></Accordion>
                    )
                }
            </VStack>
        </>
    )
}

export default PickTimeRange