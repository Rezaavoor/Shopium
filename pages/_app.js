import { ThemeProvider } from '@emotion/react'
import { Provider } from 'next-auth/client'
import Layout from '../components/Layout'
import '../styles/globals.css'
import theme from '../styles/theme'
import { ContextProvider } from '../utils/context'

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  )
}

export default MyApp
