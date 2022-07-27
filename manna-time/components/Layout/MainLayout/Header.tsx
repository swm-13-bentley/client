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
                <link rel="icon" href="/public/images/favicon.ico" />

                {/* open graph */}
                <meta property="og:title" content="언제만나" />
                <meta property="og:description" content="약속시간 정하기 어려울땐? 언제만나!" />
                <meta property="og:url" content="https://mannatime.io/" />
                <meta property="og:image" content="{{ url_for('public/image', filename='og_background.png') }}" />
            </Head>
        </>
    )
}

export default Header