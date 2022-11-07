import { InputBox } from "@/components/Atom/Box"
import { Body1, Headline2 } from "@/components/Atom/Letter"
import { VStack } from "@chakra-ui/react"
import { useState } from "react"
import { Calendar, DateObject, getAllDatesInRange } from "react-multi-date-picker"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { InputBase, styled } from "@mui/material"
import "react-multi-date-picker/styles/layouts/mobile.css"
import React from "react"
import { useRecoilState } from "recoil"
import { DatePickerFilterState } from "@/src/state/DatePickerFilter"
import { months, weekDays } from "@/utils/dateFormat"
interface PickDateProps {
    value: string[]
    setValue(value: string[]): void
}

const dateRangeFormat = "YYYY-MM-DD"

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: "20px"
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        '&:focus': {
            borderRadius: 4,
        },
    },
}));

const PickDate = ({ value, setValue }: PickDateProps) => {
    const [filter, setFilter] = useRecoilState(DatePickerFilterState)

    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.value == 'range' || event.target.value == 'multiple') {
            setFilter(event.target.value)
            setValue([])
        }
    };

    return (<>
        <VStack className="mt-6 mb-5">
            <Headline2 className="mb-4">날짜를 선택해주세요</Headline2>
            <Body1>약속을 잡기 원하는 후보 날짜들을 선택하세요</Body1>
        </VStack>

        <VStack style={{ marginBottom: "10px" }}>
            <Calendar
                months={months}
                weekDays={weekDays}
                shadow={false}
                className="rmdp-mobile"
                multiple={filter == 'multiple'}
                range={filter == 'range'}
                value={value}
                showOtherDays
                onChange={(dateObjects) => {
                    if (dateObjects) {
                        if (filter == 'range') {
                            let tmpArr = getAllDatesInRange(dateObjects as DateObject[])
                            let newDate: string[] = []
                            tmpArr.map((date) => { newDate.push((date as DateObject).format(dateRangeFormat)) })
                            setValue(newDate)
                        } else if (filter == 'multiple') {
                            let newDate: string[] = [];
                            (dateObjects as DateObject[]).map((date: DateObject) => { newDate.push(date.format(dateRangeFormat)) })
                            setValue(newDate)
                        }
                    }
                }}
                mapDays={({ date, isSameDate, selectedDate }) => {
                    let props = { className: "", style:{} }
                    let isSunday = (0 == date.weekDay.index)
                    let isSaturday = (6 == date.weekDay.index)

                    if (isSunday) props.className = "highlight-red"
                    if (isSaturday) {
                        props.style = {
                            color: "#0074D9"
                        }
                    }
                    
                    const flag = (value.filter((d) => { return isSameDate(date, new DateObject(d)) }).length > 0)
                    if (flag) {
                        let backgroundColor = "#0074D9"
                        let color= "#FFFFFF"
                        props.style = {
                            backgroundColor: backgroundColor,
                            color: color
                        }
                    }
                    return props
                }}
                zIndex={0}
            />
        </VStack>
        <FormControl
            fullWidth
            sx={{
                border: "none",
                maxWidth: "350px"
            }}
        >
            <Select
                labelId="demo-simple-select-label"
                sx={{ border: "none" }}
                id="demo-simple-select"
                value={filter}
                label="필터"
                onChange={handleChange}
                input={<BootstrapInput />}
            >
                <MenuItem value={'range'}><Body1>기간 선택</Body1></MenuItem>
                <MenuItem value={'multiple'}><Body1>지정 선택</Body1></MenuItem>
            </Select>
        </FormControl>
    </>)
}

export default React.memo(PickDate)