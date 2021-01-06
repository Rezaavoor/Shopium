import { css, useTheme } from '@emotion/react'
import React, { useContext } from 'react'
import { Context } from '../utils/context'

export default function Pricerunner({ data }) {
  const [searchWord, _] = useContext(Context).searchWord
  const theme = useTheme()
  console.log(data)
  return (
    <div
      css={css`
        background-color: ${theme.colors.primary};
        width: 60vw;
        margin: auto;
        position: relative;
        top: -5px;
        padding: 1px 15px 15px 15px;
        border-radius: 20px;
        text-align: left;
      `}
    >
      <h4>Se hur mycket en ny "{searchWord}" kostar :</h4>
      {data.map((d) => {
        return (
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              p {
                margin: 0 20px;
              }
            `}
          >
            <p>{d.description}</p>
            <p>{d.price + ' kr'}</p>
          </div>
        )
      })}
    </div>
  )
}
