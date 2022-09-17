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
import { Background } from "./Wrapper"

function Layout({children}:ScriptProps , {userAgent}: AppProps & {userAgent: string}) {
    const router = useRouter()
    const match = router.asPath.match(/[^/?]*[^/?]/g)

    const pageName = match ? match[1] : ""


    const { t } = useTranslation(['common'])

    const [agent, setAgent] = useRecoilState(userAgentState)
    useEffect(() => {
        setAgent(userAgent)
    },[])

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

export const getServerSideProps = async (appContext: AppContextType) => {
    const req = appContext?.ctx?.req;
    const userAgent = req ? req.headers[`user-agent`] : navigator.userAgent;
  
    return { userAgent };
  };

export default Layout