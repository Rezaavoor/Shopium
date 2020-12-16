import Head from 'next/head'
import { queryCache, useQuery } from 'react-query'
import { useState } from 'react'
import fetchItems from '../utils/fetchItems'
import tokenGenerator from '../utils/tokenGenerator'

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
    <>
      <div>
        <Head>
          <title>Shopium</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <button
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
            console.log(page)
            queryCache.invalidateQueries('searchItems')
          }}
        >
          next page
        </button>
        <br />
        <p>blocket items:{itemsData && itemsData.blocketData.items.length}</p>
        <p>tradera items:{itemsData && itemsData.traderaData.items.length}</p>
        <p>shpock items:{itemsData && itemsData.shpockData.items.length}</p>
        {itemsStatus === 'success'
          ? itemsData.blocketData.items.map((item) => (
              <p key={item.ad_id}>{item.subject}</p>
            ))
          : itemsStatus}
      </div>
    </>
  )
}
