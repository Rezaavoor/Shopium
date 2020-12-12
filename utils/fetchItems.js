import axios from 'axios'

export default async function fetchItems(key, searchWord, page) {
  const res = await axios.post('/api/getItems', { searchWord, page })
  return res.data
}
