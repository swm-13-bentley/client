import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"


function Header({title, service}) {
    return (
        <>
            <Head>
                <title>{title} | {service}</title>
            </Head>
        </>
    )
}

export default Header