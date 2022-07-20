import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Props {
    // groupSchedule :
    participantNames : string[]
}

const IndeterminateCheckbox : React.FC<Props> = ({participantNames}) => {


    const defaultChecked = Array(participantNames.length).fill(true)
    const [checked, setChecked] = React.useState(defaultChecked);

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
                key = {'form-control-label'+idx}
                label={participantNames[idx]}
                control={<Checkbox checked={checked[idx]} onChange={(e) => handleChildrenChange(e, idx)} />}
            />
        )
    })

    return (
        <div>
            <FormControlLabel
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