import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from "@emotion/styled";
import { useState } from "react";
import hours from "@/components/Molecule/Scheduler/Hours.jsx"

interface SliderProps {
    date: string
    startTime: number
    endTime: number
    onChange: (value: number[])=>void
}

const StyledP = styled.p<{ size: string, color: string }>`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: ${({size})=>size};
line-height: 160%;

text-align: center;
letter-spacing: -0.3px;

color: ${({color})=>color};
`

const StyledSpan = styled.span<{size: string, color: string}>`
font-family: 'Pretendard';
font-style: normal;
font-weight: 400;
font-size: ${({size})=>size};
line-height: 160%;

text-align: center;
letter-spacing: -0.3px;

color: ${({color})=>color};
`

const ValueLabel = (time: number) => {
    const midDayIndex = 24
    let hhmm: string | undefined
    
    if (time == midDayIndex)
        hhmm = "12:00"
    else if (time == midDayIndex + 1)
        hhmm = "12:30"
    else
        hhmm = hours[time % midDayIndex].realTime

    return (
        <>
            <StyledSpan size={"14px"} color={"#999999"}>{time < midDayIndex || time == 48 ? "오전 " : "오후 "}</StyledSpan>
            <StyledSpan size={"14px"} color={"#333333"}>{hhmm}</StyledSpan>
            
        </>
    )
}

const minDistance = 1

function NonLinearSlider({date, startTime, endTime, onChange}: SliderProps) {
    const [value, setValue] = useState<number[]>([startTime, endTime]);

    const handleChange = (
        event: Event,
        newValue: number | number[],
        activeThumb: number,
    ) => {
        if (!Array.isArray(newValue)) {
            return;
          }
      
          if (activeThumb === 0) {
              setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
              onChange([Math.min(newValue[0], value[1] - minDistance), value[1]]);
          } else {
              setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
              onChange([value[0], Math.max(newValue[1], value[0] + minDistance)]);
          }
    };

    return (
        <Box sx={{ width: "100%" }}>
            <StyledP color="#333333" size="16px">
                {date}
            </StyledP>
            <StyledP className="mb-5" color= "#333333" size="14px">
                {ValueLabel(value[0])} ~ {ValueLabel(value[1])}
            </StyledP>
            <Slider
                value={value}
                min={Math.max(startTime-6,0)}
                step={1}
                max={Math.min(endTime+6,48)}
                onChange={handleChange}
                valueLabelDisplay="off"
                aria-labelledby="non-linear-slider"
                disableSwap
                color="primary"
            />
        </Box>
    );
}

export default NonLinearSlider