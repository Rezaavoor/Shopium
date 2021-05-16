import axios from 'axios'

export default async (req, res) => {
  let html = ''
  try{
    const response = await axios.get('https://www.blocket.se/om/press')
    html = response.data
  }
  catch(e){
    if(e.response.data){
      //for some reason, i get a 500 error but the requested data lives in the error part! I'm for sure missing something here but whatever! 
      html = e.response.data
    }
    else res.json({error: e})
  }
    const firstWord = '"authentication":{"loggedIn":false,"bearerToken":"'
    const lastWord = '","apiKey":'
    const firstIndex = html.search(firstWord) + firstWord.length
    const lastIndex = html.search(lastWord)
    const token = html.substring(firstIndex, lastIndex)
    res.statusCode = 200
    res.json({ token })
  
}
