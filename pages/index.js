import { useContext } from 'react'
import { Context } from '../utils/context'
import fetchItems from '../utils/fetchItems'
import Header from '../components/Header'
import Products from '../components/Products'
import Searchbar from '../components/Searchbar'
import Loading from '../components/Loading'

export default function Home() {
  const [searchWord, _] = useContext(Context).searchWord
  const [page, __] = useContext(Context).page

  const { itemsData, itemsStatus } = fetchItems({ searchWord, page })

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
