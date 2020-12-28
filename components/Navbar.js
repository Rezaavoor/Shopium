import { css } from '@emotion/react'
import React from 'react'

export default function Navbar() {
  return (
    <div
      css={css`
        position: absolute;
        width: 100%;
        z-index: 100;
      `}
    >
      Navbar
    </div>
  )
}
