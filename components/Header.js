import React from 'react'
import Image from 'next/image'
import { css } from '@emotion/react'

export default function Header() {
  return (
    <div
      className="headerDiv"
      css={css`
        height: 600px;
        width: 100%;
        position: relative;
      `}
    >
      <Image src="/headerCurved.png" layout="fill" />
    </div>
  )
}
