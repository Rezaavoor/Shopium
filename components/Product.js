import { css, useTheme } from '@emotion/react'
import Image from 'next/image'
import React from 'react'

export default function Product(props) {
  const theme = useTheme()
  const color = {
    primary:
      props.origin == 'blocket'
        ? theme.colors.b_primary
        : props.origin == 'tradera'
        ? theme.colors.t_primary
        : theme.colors.s_primary,
    secondary:
      props.origin == 'blocket'
        ? theme.colors.b_secondary
        : props.origin == 'tradera'
        ? theme.colors.t_secondary
        : theme.colors.s_secondary,
  }

  return (
    <div
      css={css`
        padding-top: 60%; //having a fixed aspect ratio. cool!!
        background-color: ${color.secondary};
        filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
        margin: 25px;
        border-radius: 8%;
      `}
    >
      <div
        css={css`
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          :hover {
            .image-logo {
              width: 35px;
              height: 35px;
            }
            .image-line {
              width: 45px;
              height: 35px;
            }
          }
        `}
      >
        <div
          className="image-line"
          css={css`
            position: absolute;
            top: -8px;
            left: 40px;
            width: 35px;
            height: 25px;
            transition: all 0.5s ease;
          `}
        >
          <Image src={`/${props.origin}-line.svg`} layout="fill" />
        </div>
        <div
          css={css`
            width: 45%;
            position: relative;
          `}
        >
          <p
            css={css`
              margin: 0 5px;
              position: absolute;
              top: 20%;
              left: 50%;
              transform: translate(-50%);
              width: 100%;
              max-height: 40%;
              overflow: auto;
              &::-webkit-scrollbar {
                width: 6px;
                height: 0;
                background: transparent; // Chrome/Safari/Webkit
              }
              &::-webkit-scrollbar-thumb {
                background: ${color.primary};
              }
            `}
          >
            {props.description}
          </p>
          <h3
            css={css`
              margin-bottom: 60px;
              color: green;
              position: absolute;
              bottom: 0;
              left: 30%;
            `}
          >
            {props.price ? props.price + ' kr' : ''}
          </h3>
          <div
            className="image-logo"
            css={css`
              position: absolute;
              bottom: 5px;
              left: 40%;
              width: 30px;
              height: 30px;
              transition: all 0.2s ease;
            `}
          >
            <Image
              src={`/${props.origin}-img.svg`}
              layout="fill"
              alt={props.origin}
            />
          </div>
        </div>
        <div
          css={css`
            width: 55%;
            position: relative;
            left: 1px; // fixing a minor bug
            border-radius: 8%;
            overflow: hidden;
            cursor: pointer;
          `}
          onClick={() => window.open(props.url)}
        >
          <Image
            src={props.img ? props.img : '/no-image.svg'}
            layout="fill"
            alt={props.origin}
          />
        </div>
      </div>
    </div>
  )
}
