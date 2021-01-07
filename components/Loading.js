import { css } from '@emotion/react'
import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div
      css={css`
        background-image: url('/product-background.svg');
        background-position-x: right;
        height: 200vh;
      `}
    >
      <div
        css={css`
          width: 100px;
          height: 100px;
          margin: auto;
          position: relative;
        `}
      >
        <Image src="/loading.svg" layout="fill" />
      </div>
    </div>
  )
}
