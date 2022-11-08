import { VStack } from "@chakra-ui/react"
import ShimmerCard from "./ShimmerCard"

const ShimmerContainer = () => {
    return (<VStack gap="12px" marginTop="60px">
        <ShimmerCard/>
        <ShimmerCard/>
        <ShimmerCard/>
        <ShimmerCard/>
    </VStack>)
}

export default ShimmerContainer