import { css, useTheme } from '@emotion/react'
import Image from 'next/image'
import React from 'react'

export default function Product(props) {
  const theme = useTheme()
  const color = {
    primary: props.blocket
      ? theme.colors.b_primary
      : props.tradera
      ? theme.colors.t_primary
      : theme.colors.s_primary,
    secondary: props.blocket
      ? theme.colors.b_secondary
      : props.tradera
      ? theme.colors.t_secondary
      : theme.colors.s_secondary,
  }
  const OriginLogo = () =>
    props.blocket ? (
      <Image src="/blocket-img.svg" width="60px" height="60px" />
    ) : props.tradera ? (
      <Image src="/tradera-img.svg" width="30px" height="30px" />
    ) : (
      <Image src="/shpock-img.svg" width="38px" height="38px" />
    )
  return (
    <div
      css={css`
        height: 260px;
        width: 330px;
        margin: 25px;
        background-color: ${color.secondary};
        border-radius: 20px;
        filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
        display: flex;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: -8px;
          left: 40px;
        `}
      >
        <Image
          src={`/${
            props.blocket ? 'blocket' : props.tradera ? 'tradera' : 'shpock'
          }-line.svg`}
          width="35px"
          height="25px"
        />
      </div>
      <div
        css={css`
          width: 45%;
          display: flex;
          justify-content: center;
          flex-direction: column;
        `}
      >
        <p
          css={css`
            margin: 0 5px;
          `}
        >
          {props.name}
        </p>
        <h2
          css={css`
            margin-bottom: 60px;
            color: green;
          `}
        >
          {props.price + ' kr'}
        </h2>
        <div
          css={css`
            position: absolute;
            bottom: 0;
            left: 15%;
            transform: translate(-15%);
          `}
        >
          <OriginLogo />
        </div>
      </div>
      <div
        css={css`
          width: 55%;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
        `}
      >
        <Image src={props.img} layout="fill" />
      </div>
    </div>
  )
}
