import axios from 'axios'

export default async (req, res) => {
  axios.get('https://www.blocket.se/om/press').then((response) => {
    const html = response.data
    const firstWord = '"authentication":{"loggedIn":false,"bearerToken":"'
    const lastWord = '","apiKey":'
    const firstIndex = html.search(firstWord) + firstWord.length
    const lastIndex = html.search(lastWord)
    const token = html.substring(firstIndex, lastIndex)
    res.statusCode = 200
    res.json({ token })
  })
}
