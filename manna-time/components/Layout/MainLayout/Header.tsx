import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"

interface Props{
    title: string,
    service: string
}

const Header: React.FC<Props>= function ({title, service}:Props) {
    return (
        <>
            <Head>
                <title>{`${title} | ${service}`}</title>
            </Head>
        </>
    )
}

export default Header