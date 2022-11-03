import { FilterButton } from "@/components/Atom/Button"
import { HStack } from "@chakra-ui/react"
import { useState } from "react"

interface FilterGroupProps {
    filterNames: string[]
    isChecked: boolean[]
    onChange(arg: boolean[]): void
}
const FilterGroup = ({filterNames, isChecked, onChange}: FilterGroupProps) => {
    const [isFilterChecked, setIsFilterChecked] = useState(isChecked)
    onChange(isFilterChecked)
    const buttonMap = filterNames.map((name, index) => {
        return (
            <FilterButton
                checked={isFilterChecked[index]}
                key={`${name}-${index}-${isFilterChecked[index]}`}
                onClick={() => {
                    let newValue = new Array(filterNames.length).fill(false)
                    newValue[index] = true
                    setIsFilterChecked(newValue)
                }}
            >
                {name}
            </FilterButton>
        )
    })
    return (<HStack>
        {buttonMap}
    </HStack>)
}

export default FilterGroup