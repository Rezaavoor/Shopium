import Head from 'next/head'
import { css, useTheme } from '@emotion/react'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout(props) {
  const theme = useTheme()
  return (
    <>
      <Head>
        <title>Shopium</title>
        <link rel="icon" href="/Icon.ico" />
      </Head>
      <div
        css={css`
          background-color: ${theme.colors.white};
          align-items: center;
        `}
      >
        <Navbar />
        {props.children}
        <Footer />
      </div>
    </>
  )
}
