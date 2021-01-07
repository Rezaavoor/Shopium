import { css, useTheme } from '@emotion/react'
import React from 'react'

export default function Button(props) {
  const theme = useTheme()
  return (
    <button
      css={css`
        background-color: ${props.secondary
          ? theme.colors.primary
          : theme.colors.darkblue};
        border: none;
        color: ${props.secondary ? theme.colors.gray : theme.colors.white};
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        padding: 7px 15px;
        border-radius: 15px;
        border: 0;
        outline: none;
        transition: all 0.2s ease-out;
        &:hover {
          color: ${theme.colors.darkblue};
          background-color: ${theme.colors.secondary};
        }
      `}
    >
      {props.children}
    </button>
  )
}
