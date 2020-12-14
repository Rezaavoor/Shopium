import Head from 'next/head'
import { ReactQueryDevtools } from 'react-query-devtools'
import { usePaginatedQuery } from 'react-query'
import { useState } from 'react'
import fetchItems from '../utils/fetchItems'

export default function Home() {
  const searchWord = 'samsung s9'
  const page = {
    page: 1,
    od: '',
  }
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['searchItems', searchWord, page],
    fetchItems
  )

  return (
    <>
      <div>
        <Head>
          <title>Shopium</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {status === 'success' &&
          resolvedData.traderaData.items.map((item) => (
            <p key={item.itemId}>{item.shortDescription}</p>
          ))}
        <button onClick={() => console.log(resolvedData)}>click me</button>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

// export async function getServerSideProps() {
// const data = await axios.post('/api/getItems', {
//   serachWord: 'iphone',
//   page: {
//     page: 1,
//     od: '',
//   },
// })
// console.log('fetched')
// return {
//   props: {
//     data,
//   },
// }
// }
