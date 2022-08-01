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
                <title>{`언제만나`}</title>
                <link rel="shortcut icon" href="/images/favicon.ico" />

                {/* Google Verification */}
                <meta name="google-site-verification" content="ZR-xqfnygLeDmIAV8zJ91mHRiyvBbREUSU6RwPqEGeA" />

                {/* open graph */}
                <meta property="og:title" content="언제만나 - 약속시간 확정 서비스" />
                <meta property="og:description" content="단체 약속을 간편하게, 언제만나!" />
                <meta property="og:url" content="https://mannatime.io/" />
                <meta property="og:image" content="/images/og_background.png" />
            </Head>
        </>
    )
}

export default Header