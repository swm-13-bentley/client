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
                    <Circle size='40px' bg='tomato' color='white' mr="5">
                        <h1>{index}</h1>
                    </Circle>
                    <h1>{title}</h1>
                </HStack>
                <Center flexDirection={"column"}>
                    <>{children}</>
                </Center>
            </Box>
        </>
    )
}

export default ProcedureLayout