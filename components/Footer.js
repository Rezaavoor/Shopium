import { css, useTheme } from '@emotion/react'
import React from 'react'

export default function Footer() {
  const theme = useTheme()
  return (
    <div
      css={css`
        background-color: ${theme.colors.primary};
        height: 300px;
        position: relative;
      `}
    >
      <p
        css={css`
          position: absolute;
          font-weight: 700;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        `}
      >
        {'2021 '}
        <a href="https://www.reza.social" target="_blank">
          Reza Hosseini 2021
        </a>
      </p>
    </div>
  )
}
