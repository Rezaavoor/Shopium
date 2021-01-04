import { css } from '@emotion/react'
import { queryCache, useQuery } from 'react-query'
import { useState } from 'react'
import fetchItems from '../utils/fetchItems'
import tokenGenerator from '../utils/tokenGenerator'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Products from '../components/Products'

export default function Home() {
  const searchWord = 'samsung s9'
  const [page, setPage] = useState({
    page: 1,
    od: '',
  })
  const { data: token, status: tokenStatus } = useQuery(
    'generateToken',
    tokenGenerator,
    { staleTime: 900000 } //data is old after 15min
  )

  const [startFetching, setStartFetching] = useState(false)
  const { data: itemsData, status: itemsStatus } = useQuery(
    ['searchItems', token, searchWord, page],
    fetchItems,
    { enabled: startFetching, staleTime: 900000 }
  )

  return (
    <Layout>
      <Header />
      <Products />
    </Layout>
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
