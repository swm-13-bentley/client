import useViewport from "@/hooks/useViewport"
import { userAgentState } from "@/src/state/UserAgent"
import { Flex } from "@chakra-ui/react"
import { useTranslation } from "next-i18next"
import { AppProps } from "next/app"
import { AppContextType } from "next/dist/shared/lib/utils"
import { useRouter } from "next/router"
import { ScriptProps } from "next/script"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import Header from "./Header"
import Navbar from "./Navbar"

const hideNavbar = ['test-page']

const getPageName = (match: string[] | undefined | null) => {
    if (match)
        if (match.length == 1)
            return match[0]
        else
            return match[1]
    return ""
}

function Layout({ children }: ScriptProps, { userAgent }: AppProps & { userAgent: string }) {
    const router = useRouter()
    const match = router.asPath.match(/[^/?]*[^/?]/g)
    const pageName = getPageName(match)

    const { t } = useTranslation(['common'])

    const [agent, setAgent] = useRecoilState(userAgentState)
    useEffect(() => {
        setAgent(userAgent)
    }, [])

    if (hideNavbar.includes(pageName)) {
        return (
            <>
                <Header title={t(pageName) as string} service={t('service') as string} />
                {children}
            </>
        )
    }

    return (
        <>
            <Header title={t(pageName) as string} service={t('service') as string} />
            <Navbar />
            <Flex paddingTop="59px" width="100%" justifyContent="center" >
                {children}
            </Flex>
        </>
    )
}

export const getServerSideProps = async (appContext: AppContextType) => {
    const req = appContext?.ctx?.req;
    const userAgent = req ? req.headers[`user-agent`] : navigator.userAgent;

    return { userAgent };
};

export default Layout