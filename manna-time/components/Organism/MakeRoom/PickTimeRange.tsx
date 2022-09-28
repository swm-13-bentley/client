import { InputBox } from "@/components/Atom/Box"
import { Body1, Headline2 } from "@/components/Atom/Letter"
import { VStack } from "@chakra-ui/react"


const PickTimeRange = () => {
    return (<>
        <VStack className="mt-12 mb-10">
            <Headline2 className="mb-4">시간대를 선택해주세요</Headline2>
            <Body1>가능한 시간대를 복수로 선택할 수 있어요</Body1>
        </VStack>
    </>)
}

export default PickTimeRange