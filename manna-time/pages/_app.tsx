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

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {

  mixpanel.init('de0053b0ed79028b519487b67141eb58', { debug: true })
  mixpanel.track('Sign up')
  console.log("hey")

  // return (<Component />)
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
