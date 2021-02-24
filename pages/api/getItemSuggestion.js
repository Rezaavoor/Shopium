import axios from 'axios'

export default async (req, res) => {
  try {
    //api route example: /getItemSuggestion?token=d728e10029294135f048da2b6f5d9b91c93ef556&q=samsung
    const {token, q} = req.query
    const response = await axios.get(`https://api.blocket.se/autocomplete/v4/autocomplete?q=${q}`, {
      headers: { Authorization: 'Bearer ' + token }
    })
    const suggestions = response.data.completions.map(c=>c.q)
    res.statusCode = 200
    res.json({'suggestions': suggestions})

  } catch (error) {
    console.log('error:', error)
    res.statusCode = 200
    res.json({error})
  }
}