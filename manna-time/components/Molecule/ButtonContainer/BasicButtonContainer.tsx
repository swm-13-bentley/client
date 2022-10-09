import { VStack } from "@chakra-ui/react"

interface ContainerProps {
    marginTop: string
    children?: React.ReactNode
}

const BasicButtonContainer = ({ marginTop, children }: ContainerProps) => {
    return (
        <VStack className={`mt-${marginTop} space-y-2 mb-10`}>
            {children}
        </VStack>
    )
}

export default BasicButtonContainer