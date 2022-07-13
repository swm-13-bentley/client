import { Box, Center, Circle, HStack } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
    index: number,
    title: string,
    children: ReactNode
}

const ProcedureLayout: React.FC<Props> = function ({index, title, children}) {
    return (
        <>
            <Box mb="30">
                <HStack cursor={"pointer"} onClick={() => {}} width="100%" mb="30">
                    <Circle size='40px' bg='#757ce8' color='white' mr="5">
                        <span className="text-white text-xl">{index}</span>
                    </Circle>
                    <span className="text-black-500 text-xl">{title}</span>
                </HStack>
                <Center flexDirection={"column"}>
                    <>{children}</>
                </Center>
            </Box>
        </>
    )
}

export default ProcedureLayout