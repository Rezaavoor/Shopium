import axios from 'axios'

export default async function handleItem(itemInfo, method) {
  const res = await axios
    .post('/api/handleItem', {
      itemInfo,
      method,
    })
    .catch((e) => {
      if (e.response.status == 401) {
        //token is incorrect
        return { authorize: { status: 'Not authenticated' } }
      }
    })
  return res.data
}
