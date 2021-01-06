import { ThemeProvider } from '@emotion/react'
import Layout from '../components/Layout'
import '../styles/globals.css'
import theme from '../styles/theme'
import { ContextProvider } from '../utils/context'

function MyApp({ Component, pageProps }) {
  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ContextProvider>
  )
}

export default MyApp
