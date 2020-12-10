import Head from 'next/head'
import { ReactQueryDevtools } from 'react-query-devtools'
import { usePaginatedQuery } from 'react-query'

const fetchTradera = async (key, serachWord, page) => {
  const res = await (
    await fetch(
      `https://www.tradera.com/search.json?q=${serachWord}&page=${page}`
    )
  ).json()
  return res
}

export default function Home({ data }) {
  return (
    <div>
      <Head>
        <title>Shopium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <p>helow</p>
      {data + ''}
    </div>
  )
}

export async function getServerSideProps() {
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['Tradera API', 'iphone', 1],
    fetchTradera
  )
  return {
    props: {
      data: { resolvedData, latestData, status },
    },
  }
}
