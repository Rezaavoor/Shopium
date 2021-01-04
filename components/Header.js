import React from 'react'
import Image from 'next/image'
import { css, useTheme } from '@emotion/react'

export default function Header() {
  const theme = useTheme()
  const scale = 0.7
  return (
    <div
      css={css`
        width: 100%;
        height: 600px;
        position: relative;
        text-align: center;
        background-color: ${theme.colors.primary};
      `}
    >
      <div
        css={css`
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 100%;
          display: flex;
          margin: auto;
          padding: 0 25px;
        `}
      >
        <div
          css={css`
            height: 100%;
            width: 40%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            * {
              text-shadow: 14px 14px 20px #0000004a;
            }
          `}
        >
          <h4>Välkommen till</h4>
          <h1
            css={css`
              margin-left: 30px;
            `}
          >
            Shopium!
          </h1>
          <p2
            css={css`
              margin-left: 100px;
              margin-top: 5px;
            `}
          >
            Ditt nya favoritställe för att handla begagnat :)
          </p2>
        </div>
        <div
          css={css`
            height: 100%;
            width: 60%;
            /* border: 1px red solid; */
            position: relative;
          `}
        >
          <div
            css={css`
              position: absolute;
              bottom: 10%;
              left: 5%;
              filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
            `}
          >
            <Image
              src="/headphone.png"
              priority={true}
              width={272 * scale}
              height={299 * scale}
              quality="100"
            />
          </div>
          <div
            css={css`
              position: absolute;
              bottom: 10%;
              left: 35%;
              filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
            `}
          >
            <Image
              src="/keyboard.png"
              priority={true}
              width={436 * scale}
              height={186 * scale}
              quality="100"
            />
          </div>
          <div
            css={css`
              position: absolute;
              top: 38%;
              right: 32%;
              filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
            `}
          >
            <Image
              src="/pen.png"
              priority={true}
              width={25 * scale}
              height={203 * scale}
              quality="100"
            />
          </div>
          <div
            css={css`
              position: absolute;
              bottom: 10%;
              right: 5%;
              filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
            `}
          >
            <Image
              src="/mouse.png"
              priority={true}
              width={88 * scale}
              height={173 * scale}
              quality="100"
            />
          </div>
          <div
            css={css`
              position: absolute;
              top: 25%;
              right: 5%;
              filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
            `}
          >
            <Image
              src="/notebook.png"
              priority={true}
              width={197 * scale}
              height={312 * scale}
              quality="100"
            />
          </div>
          {/********************************************** */}
          <div
            css={css`
              position: absolute;
              top: 22%;
              left: 10%;
            `}
          >
            <Image
              src="/spara80.svg"
              priority={true}
              width={253 * scale}
              height={279 * scale}
              quality="100"
            />
          </div>
          <div
            css={css`
              position: absolute;
              top: 25%;
              left: 40%;
            `}
          >
            <Image
              src="/miljövänligt.svg"
              priority={true}
              width={233 * scale}
              height={179 * scale}
              quality="100"
            />
          </div>
          <div
            css={css`
              position: absolute;
              bottom: 37%;
              left: 30%;
            `}
          >
            <Image
              src="/hållbart.svg"
              priority={true}
              width={191 * scale}
              height={184 * scale}
              quality="100"
            />
          </div>
          <div
            css={css`
              position: absolute;
              bottom: 30%;
              right: 35%;
            `}
          >
            <Image
              src="/billigt.svg"
              priority={true}
              width={173 * scale}
              height={179 * scale}
              quality="100"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
