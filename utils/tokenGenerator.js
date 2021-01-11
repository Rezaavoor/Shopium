import axios from 'axios'

export default async function tokenGenerator(key) {
  const { data } = await axios.get('/api/getBearerToken')
  return data.token
}
