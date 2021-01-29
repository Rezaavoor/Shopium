import axios from 'axios'
import { useQuery } from 'react-query'

async function tokenGenerator(key) {
  const { data } = await axios.get('/api/getBearerToken')
  return data.token
}

async function itemsFetcher(key, token, searchWord, page) {
  const res = await axios
    .post('/api/getItems', { token, searchWord, page })
    .catch((e) => {
      if (e.response.status == 401) {
        //token is incorrect
        return { authorize: { status: 'Could not find authentication method' } }
      }
    })

  return res.data
}

export default function getItems({ searchWord, page }) {
  const { data: token, status: tokenStatus } = useQuery(
    'generateToken',
    tokenGenerator,
    { staleTime: 900000 } //data is old after 15min
  )

  const { data: itemsData, status: itemsStatus } = useQuery(
    ['searchItems', token, searchWord, page],
    itemsFetcher,
    { staleTime: 900000, enabled: !!token }
  )
  return { itemsData, itemsStatus }
}
