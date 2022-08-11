import { Box, Center, Circle, HStack } from "@chakra-ui/react"
import { Transition } from "@headlessui/react"
import { ReactNode, useState } from "react"

interface Props {
    index: number,
    title: string,
    children: ReactNode
}

const ProcedureLayout: React.FC<Props> = function ({ index, title, children }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <Box mb="30">
                <HStack cursor={"pointer"} onClick={() => {setIsOpen(true)}} width="100%" mb="30">
                    <Circle size='40px' bg='#757ce8' color='white' mr="5">
                        <h2 className="text-white text-xl">{index}</h2>
                    </Circle>
                    <h2 className="text-black-500 text-xl">{title}</h2>
                </HStack>
                {/* <Transition
					show={isOpen}
					enter="transition duration-100 transform"
					enterFrom="opacity-100 scale-100"
					enterTo="opacity-0 scale-0"
                    >    
                    </Transition> */}
                <Center
                    flexDirection={"column"}>
                    <>{children}</>
                </Center>
            </Box>
        </>
    )
}

export default ProcedureLayout