import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import Header from "./Header"
import Navbar from "./Navbar"

function Layout({children}) {
    const router = useRouter()
    const match = router.asPath.match(/[^/?]*[^/?]/g)
    const pageName = match![1]

    const { t } = useTranslation(['common'])

    return (
        <>
            <Header title={t(pageName)} service={t('service')} />
            <Navbar/>
            <div>{children}</div>
        </>
    )
}

export default Layout