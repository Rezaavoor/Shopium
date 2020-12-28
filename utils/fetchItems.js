import axios from 'axios'

export default async function fetchItems(key, token, searchWord, page) {
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
