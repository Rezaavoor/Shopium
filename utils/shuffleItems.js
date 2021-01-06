export default function shuffleItems([bData, tData, sData]) {
  let items = []
  for (let i = 5; i < bData.length; i += 5) {
    const blocket = bData.slice(i - 5, i)
    const tradera = tData.slice(i - 5, i)
    const shpock = sData.slice(i - 5, i)
    const randomed = blocket
      .concat(tradera, shpock)
      .sort(() => Math.random() - 0.5)
    items = items.concat(randomed)
  }
  return items
}
