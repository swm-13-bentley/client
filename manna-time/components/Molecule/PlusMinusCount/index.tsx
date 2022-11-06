import PlusMinusButton from "@/components/Atom/Button/PlusMinusButton"
import { Subhead2 } from "@/components/Atom/Letter"
import { Center, HStack } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"

const PlusMinusCount = (props: { onChange: (count: number) => void }) => {
    const [count, setCount] = useState(1)

    useEffect(() => {
        props.onChange(count)
    }, [count])

    return (
        <HStack style={{ width: "162px", display: "flex" }}>
            <div style={{ flex: 1 }}>
                <PlusMinusButton style={"minus"} disabled={count <= 1} onClick={() => setCount(count => count - 1)} />
            </div>
            <Center style={{ flex: 2, alignContent: "center", alignItems: "center" }}>
                <Subhead2 style={{ textAlign: "center" }}>{count}</Subhead2>
            </Center>
            <div style={{ flex: 1 }}>
                <PlusMinusButton style={"plus"} disabled={count > 100} onClick={() => setCount(count => count + 1)} />
            </div>
        </HStack>
    )
}

export default PlusMinusCount