import React, { useState, createContext } from 'react'

export const Context = createContext()

export const ContextProvider = (props) => {
  const [searchWord, setSearchWord] = useState('macbook pro')
  const [page, setPage] = useState({
    page: 1,
    od: '',
  })
  const [pages, setPages] = useState([{page: 1, od:''}])

  const contextData = {
    searchWord: [searchWord, setSearchWord],
    page: [page, setPage],
    pages: [pages, setPages],
  }

  return (
    <Context.Provider value={contextData}>{props.children}</Context.Provider>
  )
}
