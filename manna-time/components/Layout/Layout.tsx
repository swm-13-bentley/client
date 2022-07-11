import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import Header from "./Header"

function Layout({children}) {
    const router = useRouter()
    const match = router.asPath.match(/[^/?]*[^/?]/g)
    const pageName = match![1]

    const { t } = useTranslation(['common'])

    return (
        <>
            <Header title={pageName} />
            <div>{children}</div>
        </>
    )
}

export default Layout