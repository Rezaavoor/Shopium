import { useQuery } from 'react-query'
import { useContext } from 'react'
import { Context } from '../utils/context'
import fetchItems from '../utils/fetchItems'
import tokenGenerator from '../utils/tokenGenerator'
import Header from '../components/Header'
import Products from '../components/Products'
import Searchbar from '../components/Searchbar'
import Loading from '../components/Loading'

export default function Home() {
  const [searchWord, _] = useContext(Context).searchWord
  const [page, __] = useContext(Context).page
  const { data: token, status: tokenStatus } = useQuery(
    'generateToken',
    tokenGenerator,
    { staleTime: 900000 } //data is old after 15min
  )

  const { data: itemsData, status: itemsStatus } = useQuery(
    ['searchItems', token, searchWord, page],
    fetchItems,
    { staleTime: 900000, enabled: !!token }
  )

  return (
    <>
      <Header />
      <Searchbar />
      {itemsStatus == 'success' && itemsData ? (
        <Products items={itemsData} />
      ) : itemsStatus != 'error' ? (
        <Loading />
      ) : (
        'error'
      )}
    </>
  )
}
