import { InputBox } from "@/components/Atom/Box"
import { Body1, Headline2 } from "@/components/Atom/Letter"
import { VStack } from "@chakra-ui/react"

interface NameProps {
    value: string,
    setValue(value: string): void
}

const AppointmentName = ({value, setValue} : NameProps) => {
    return (<>
        <VStack className="mt-12 mb-10">
            <Headline2 className="mb-4">어떤 약속인가요?</Headline2>
            <Body1>약속 이름을 15자 내외로 명료하게 작성해주세요</Body1>
        </VStack>
        <InputBox
            placeholder={"9월 정기 모임"}
            id={"appointment"}
            setValue={setValue}
            value={value}
        />
    </>)
}

export default AppointmentName