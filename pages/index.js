import Head from 'next/head'
import { useQuery } from 'react-query'
import { useState } from 'react'
import fetchItems from '../utils/fetchItems'
import tokenGenerator from '../utils/tokenGenerator'

export default function Home() {
  const searchWord = 'samsung s9'
  const page = {
    page: 1,
    od: '',
  }
  const { data: token, status: tokenStatus } = useQuery(
    'generateToken',
    tokenGenerator,
    { staleTime: 900000 } //15min
  )

  const [startFetching, setStartFetching] = useState(false)
  const { data: itemsData, status: itemsStatus } = useQuery(
    ['searchItems', token, searchWord, page],
    fetchItems,
    { enabled: startFetching }
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
        <br />
        {itemsStatus === 'success'
          ? itemsData.blocketData.items.map((item) => (
              <p key={item.ad_id}>{item.subject}</p>
            ))
          : itemsStatus === 'loading' && 'loading'}
      </div>
    </>
  )
}
