import { css, ThemeProvider } from '@emotion/react'
import { queryCache, useQuery } from 'react-query'
import { useState } from 'react'
import fetchItems from '../utils/fetchItems'
import tokenGenerator from '../utils/tokenGenerator'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Products from '../components/Products'
import theme from '../styles/theme'

export default function Home() {
  const searchWord = 'ps5'
  const [page, setPage] = useState({
    page: 1,
    od: '',
  })
  const { data: token, status: tokenStatus } = useQuery(
    'generateToken',
    tokenGenerator,
    { staleTime: 900000 } //data is old after 15min
  )

  const [startFetching, setStartFetching] = useState(true)
  const { data: itemsData, status: itemsStatus } = useQuery(
    ['searchItems', token, searchWord, page],
    fetchItems,
    { enabled: startFetching, staleTime: 900000 }
  )

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Header />
        {itemsStatus == 'success' && itemsData ? (
          <Products items={itemsData} />
        ) : (
          itemsStatus
        )}
      </Layout>
    </ThemeProvider>
  )
}

{
  /* <button
  onClick={() => {
    setStartFetching(true)
  }}
>
  show data
</button>

<button onClick={() => queryCache.invalidateQueries('generateToken')}>
update token
</button>
<button
  onClick={() => {
    setPage({
      od: itemsData.shpockData.next,
      page: itemsData.traderaData.next,
    })
    queryCache.invalidateQueries('searchItems')
  }}
>
  next page
</button> */
}
