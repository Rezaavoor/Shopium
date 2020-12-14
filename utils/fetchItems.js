import axios from 'axios'

export default async function fetchItems(key, token, searchWord, page) {
  const res = await axios.post('/api/getItems', { token, searchWord, page })
  return res.data
}
