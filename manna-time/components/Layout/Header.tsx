import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"


function Header({title}) {
    const { t } = useTranslation(['common'])
    return (
        <>
            <Head>
                <title>{title} | {t('service')}</title>
            </Head>
        </>
    )
}

export default Header