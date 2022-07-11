import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"


function Header() {
    const { t } = useTranslation(['common'])
    const router = useRouter()
    const pageName = router.asPath.match(/[^/?]*[^/?]/g)![1]
    return (
        <>
            <Head>
                <title>{t(pageName)} | {t('service')}</title>
            </Head>
        </>
    )
}

export default Header