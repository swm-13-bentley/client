import { useTranslation } from "next-i18next"
import Head from "next/head"
import { useRouter } from "next/router"

interface Props{
    title: string,
    service: string
}

const Header: React.FC<Props> = function ({ title, service }: Props) {
    const router = useRouter()
    const url = 'https://' + process.env.NEXT_PUBLIC_SERVICE_URL + router.asPath
    return (

        <>
            <Head>
                <title>{`언제만나 - 단체 약속을 간편하게, 약속시간 확정 서비스`}</title>
                <meta name="description" content="불필요한 대화, 투표는 이제 그만! 그룹, 단체 약속 시간을 간편하게 정해보세요." />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

                
                <link rel="canonical" href={url}></link>
                <link rel="shortcut icon" href="/images/favicon.ico" />

                {/* Naver Search Console */}
                <meta name="naver-site-verification" content="e48802c2b318d1b69ea3b51f4f0c60b4b55d7b02" />

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