import Head from 'next/head'
import { css, ThemeProvider } from '@emotion/react'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import theme from '../styles/theme'

export default function Layout(props) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Shopium</title>
        <link rel="icon" href="/Icon.ico" />
      </Head>
      <div
        css={css`
          background-color: pink;
          align-items: center;
        `}
      >
        <Navbar />
        <div>{props.children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
