import { Center } from "@chakra-ui/react"
import { NextPage } from "next"
import CenterFlexLayout from "../../../components/Layout/CenterFlexLayout"

const Entry: NextPage = function () {

    return (
        <>
            <CenterFlexLayout>
                <Center>
                    <h3>방 qid를 함께 입력해주세요</h3>
                </Center>
            </CenterFlexLayout>
        </>
    )
}

// export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
//     const qid = getStringValueFromQuery({query, field: 'qid'})
// }

export default Entry