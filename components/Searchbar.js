import { css, useTheme } from '@emotion/react'
import React, { useContext, useState } from 'react'
import { Context } from '../utils/context'

export default function Searchbar() {
  const theme = useTheme()
  const [searchWord, setSearchWord] = useContext(Context).searchWord
  const [value, setValue] = useState(searchWord)
  return (
    <div
      css={css`
        text-align: center;
        margin: 10px;
        margin-bottom: 30px;
        margin: 10px;
        margin-bottom: 30px;
      `}
    >
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(e) => e.key == 'Enter' && setSearchWord(value)}
        css={css`
          width: 60vw;
          font-size: 1rem;
          padding: 10px 25px;
          border-radius: 5px;
          border: 1px ${theme.colors.darkblue} solid;
          outline: none;
        `}
      />
    </div>
  )
}
