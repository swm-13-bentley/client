import '../styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/Layout/Layout'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../src/createEmotionCache'
import theme from '../src/theme'

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
