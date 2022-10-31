import { FilterButton } from "@/components/Atom/Button";
import Accordion from "@/components/Molecule/Accordion";
import { useEffect, useState } from "react";

interface FilterProps {
    participantNames: string[]
    isChecked: boolean[]
    onChange(arg: boolean[]): void
}

const Filter = ({ participantNames, isChecked, onChange }: FilterProps) => {
    const [checked, setChecked] = useState([]);
    onChange(checked)

    useEffect(() => {
        if (participantNames != null) {
            if (isChecked == null)
                setChecked(Array(participantNames.length).fill(true));
            else
                setChecked(isChecked)
        }
    }, [participantNames])

    const handleAllChange = () => {
        let newFlag : boolean
        if (checked.every(value => value == false))
            newFlag = true
        else if (checked.every(value => value == true))
            newFlag = false
        else
            newFlag = true
        setChecked(Array(participantNames.length).fill(newFlag));
    };

    const handleChildrenChange = (index: number) => {
        let newChecked = [...checked]
        newChecked[index] = !newChecked[index]
        setChecked(newChecked);
    };

    const filterButton = participantNames.map((name, index) => {
        return (
            <FilterButton
                key={`filter-${name}-${index}`}
                checked={checked[index]}
                onClick={()=>{handleChildrenChange(index)}}
            >{name}</FilterButton>
        )
    })

    const title = () => {
        if (participantNames.length == 0)
            return '참여자'
        
        else if (checked.every(value => value == true))
            return '전체 참여자'
        else 
            return '참여자'
    }

    const emphasizedTitle = () => {
        if (participantNames.length == 0)
            return '0명'
        
        else if (checked.every(value => value == false))
            return '0명'
        else {
            const trueNum = checked.filter(value => value === true).length
            if (trueNum == 1)
                return `${participantNames[indexOfTrue(checked)]}`
            else
                return `${participantNames[indexOfTrue(checked)]} 외 ${trueNum - 1}명`
        }
    }

    const indexOfTrue = (array: boolean[]) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i])
                return i
        }
        return -1
    }

    return (
        <Accordion title={title()} emphasizedTitle={emphasizedTitle()}>
            <FilterButton
                checked={(checked.every(value => value == true))}
                onClick={handleAllChange}
            >전체 참여자</FilterButton>
            {filterButton}
        </Accordion>
    )
}


export default Filter