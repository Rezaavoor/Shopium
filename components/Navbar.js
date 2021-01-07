import { css, useTheme } from '@emotion/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Button from './Button'

export default function Navbar() {
  const theme = useTheme()
  const [onScroll, setonScroll] = useState({
    boxShadow: 0, //6
    backgroundColor: 'transparent', //${theme.colors.primary}
    height: 40, //30
  })
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = () => {
        let currentScrollPos = window.pageYOffset
        if (currentScrollPos > 5) {
          setonScroll({
            boxShadow: 6,
            backgroundColor: theme.colors.primary,
            height: 40,
          })
        } else {
          setonScroll({
            boxShadow: 0,
            backgroundColor: 'transparent',
            height: 50,
          })
        }
      }
    }
  })

  return (
    <div
      css={css`
        position: fixed;
        width: 100%;
        z-index: 100;
        box-shadow: 0 ${onScroll.boxShadow + 'px'} ${onScroll.boxShadow + 'px'}
          ${'-' + onScroll.boxShadow + 'px'} ${theme.colors.darkblue};
        height: ${onScroll.height + 'px'};
        background-color: ${onScroll.backgroundColor};
        transition: 0.5s ease;
      `}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;
          max-width: 1200px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 25px;
        `}
      >
        <div
          css={css`
            position: relative;
            cursor: pointer;
            width: 90px;
            height: 25px;
            transition: all 0.2s ease-out;
            :hover {
              width: 95px;
              height: 30px;
            }
          `}
          onClick={() => window.open('/', '_self')}
        >
          <Image src="/icon.svg" layout="fill" />
        </div>
        <div>
          <Button>Bli medlem</Button>
          <Button secondary>Sparade</Button>
          <Button secondary>Logga in</Button>
        </div>
      </div>
    </div>
  )
}
