import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../src/createEmotionCache'
import theme from '../src/theme'
import MainLayout from '../components/Layout/MainLayout/MainLayout'

import mixpanel from 'mixpanel-browser'
import { useEffect } from 'react'
import { MixpanelTracking } from '@/utils/mixpanel'
import { RecoilRoot } from 'recoil'
import { useRouter } from 'next/router'

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter()
  useEffect(() => { 
    MixpanelTracking.getInstance().pageViewed(router.pathname)
  },[])
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </RecoilRoot>
        </ThemeProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
