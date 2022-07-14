import { Flex } from "@chakra-ui/react"
import { ScriptProps } from "next/script"

function CenterFlexLayout({ children }: ScriptProps) {
    return (<>
        <Flex margin="50px auto 30px">
            <Flex direction="column" width="100%" rounded={6} maxW="690px" ml="20px" mr="20px">
                {children}
            </Flex>
        </Flex>
    </>)
}

export default CenterFlexLayout