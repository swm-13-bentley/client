import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { NativeSelect } from '@mui/material';
import { Center, Flex, HStack } from '@chakra-ui/react';
import times from './Times';
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';

type Time = {
    text: string,
    value: string
}

const options = times.map((time: Time , index: number) => {
    return (
        <option
            key={index}
            value = {time.value}
        >{time.text}</option>
    )
})

interface Props {
    onSelectChange(timeRange: string[]): void
}

const TimeRangeSelectbox = ({onSelectChange}:Props) => {
    const [startTime, setStartTime] = useState("09:00:00")
    const [endTime, setEndTime] = useState("17:00:00")
    
    const handleStartChange : ChangeEventHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setStartTime(event.target.value as string)
        onSelectChange([event.target.value as string,endTime])
    }
    const handleEndChange : ChangeEventHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setEndTime(event.target.value as string)
        onSelectChange([startTime,event.target.value as string])
    }


    return (
        <Box width="100%">
            <HStack className=' space-x-5'>
                <FormControl variant='filled' sx={{width:"50%"}}>
                    <NativeSelect
                        defaultValue={startTime}
                        inputProps={{
                            name: 'start time',
                            id: 'start-time',
                        }}
                        value = {startTime}
                        onChange={handleStartChange}
                    >
                        {options}
                    </NativeSelect>
                </FormControl>
                
                <span>-</span>

                <FormControl variant='filled' sx={{width:"50%"}}>
                    <NativeSelect
                        sx={{width:"auto"}}
                        defaultValue={endTime}
                        inputProps={{
                            name: 'end time',
                            id: 'end-time',
                        }}
                        value = {endTime}
                        onChange={handleEndChange}
                    >
                        {options}
                    </NativeSelect>
                </FormControl>                
            </HStack>
        </Box>
    );
}
export default TimeRangeSelectbox