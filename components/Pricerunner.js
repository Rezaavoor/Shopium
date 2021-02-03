import { css, useTheme } from '@emotion/react'
import React, { useContext } from 'react'
import { Context } from '../utils/context'

export default function Pricerunner({ data }) {
  const [searchWord, _] = useContext(Context).searchWord
  const theme = useTheme()
  return (
    <div
      css={css`
        background-color: ${theme.colors.primary};
        width: 60vw;
        max-width: 1100px;
        margin: auto;
        position: relative;
        top: -5px;
        padding: 1px 15px 15px 15px;
        margin-bottom: 15px;
        border-radius: 20px;
        text-align: left;
        ${theme.mq[2]} {
          //768px
          width: 90vw;
          padding: 1px 5px 5px 5px;
          border-radius: 10px;
        }
      `}
    >
      <h4>Se hur mycket en ny "{searchWord}" kostar :</h4>
      {data.map((d) => {
        return (
          <div
            key={d.id}
            css={css`
              display: flex;
              justify-content: space-between;
              p {
                margin: 2px 20px;
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
