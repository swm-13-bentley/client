import { Flex } from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { ScriptProps } from "next/script"
import Header from "./Header"
import Navbar from "./Navbar"
import { Background } from "./Wrapper"

function Layout({children}:ScriptProps) {
    const router = useRouter()
    const match = router.asPath.match(/[^/?]*[^/?]/g)

    const pageName = match ? match[1] : ""


    const { t } = useTranslation(['common'])

    return (
        <>
            <Header title={t(pageName) as string} service={t('service') as string} />
            <Navbar/>
            <Flex paddingTop={"59px"} width="100%" >
                <Background>
                {children}
                </Background>
            </Flex>
        </>
    )
}

export default Layout