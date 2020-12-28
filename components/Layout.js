import Head from 'next/head'
import { css } from '@emotion/react'
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>Shopium</title>
        <link rel="icon" href="/Icon.ico" />
      </Head>
      <div
        css={css`
          background-color: pink;
        `}
      >
        <Navbar />
        {props.children}
        <Footer />
      </div>
    </>
  )
}
