import axios from 'axios'

export default async function handleItem(userEmail, props, method) {
  const res = await axios
    .post('/api/handleItem', {
      userEmail,
      itemInfo: props,
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
