import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect } from 'react';

interface Props {
    // groupSchedule :
    participantNames: string[]
    isChecked: boolean[]
    onChange(arg: boolean[]): void
}

const IndeterminateCheckbox = ({ participantNames, isChecked, onChange }: Props) => {
    
    const [checked, setChecked] = React.useState([]);
    // console.log(isChecked)
    onChange(checked)

    useEffect(() => {
        // console.log(participantNames)
        if (participantNames != null) {
            setChecked(Array(participantNames.length).fill(true));
        }
    },[participantNames])

    const handleAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(Array(participantNames.length).fill(event.target.checked));
    };

    const handleChildrenChange = (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        let newChecked = [...checked]
        newChecked[idx] = event.target.checked
        setChecked(newChecked);
    };

    const formControlLabel = checked.map((event, idx: number) => {
        return (
            <FormControlLabel
                className="md:text-2xs text-xs"    
                sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                key = {'form-control-label'+participantNames[idx]}
                label={participantNames[idx]}
                control={
                    <Checkbox
                        
                        checked={checked[idx]}
                        onChange={(e) => handleChildrenChange(e, idx)}
                    />
                }
            />
        )
    })

    return (
        <div>
            <FormControlLabel
                className="md:text-2xs text-xs mt-1"    
                sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                label="전체"
                control={
                    <Checkbox
                        checked={checked.every(value=>value==true)}
                        indeterminate={!(checked.every(value=>value==true) || checked.every(value=>value==false))}
                        onChange={handleAllChange}
                    />
                }
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', ml: 3 }}>
                {formControlLabel}
            </Box>
        </div>
    );
}

export default IndeterminateCheckbox