import axios from 'axios'

export default async function tokenGenerator(key) {
  let response = ''
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev
    const { data } = await axios.post('http://localhost:3001')
    response = data
  } else {
    //prod
    const { data } = await axios.post(
      'https://shopiumbearergenerator.vercel.app/'
    )
    response = data
  }
  console.log(response)
  return response.token
}
