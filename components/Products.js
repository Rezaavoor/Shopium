import { css } from '@emotion/react'
import React, { useEffect } from 'react'
import shuffleItems from '../utils/shuffleItems'
import Product from './Product'

export default function Products(props) {
  const { items } = props

  // save next page info into session to use it later if more info was needed
  useEffect(() => {
    const nextPage = {
      page: items.blocketData.next,
      od: items.shpockData.next,
    }
    sessionStorage.setItem('nextPage', JSON.stringify(nextPage))
  }, [])

  const products = shuffleItems([
    items.blocketData.items,
    items.traderaData.items,
    items.shpockData.items,
  ])
  console.log(items.pricerunnerData.items[0])
  return (
    <div
      css={css`
        height: auto;
        background-image: url('/product-background.svg');
        background-position-x: right;
      `}
    >
      <div
        css={css`
          width: 100%;
          max-width: 1200px;
          margin: auto;
          padding: 0 25px;
          text-align: center;
          display: grid;
          position: relative;
          grid-template-columns: 1fr 1fr 1fr;
        `}
      >
        {products.map((p) => (
          <Product
            key={p.id}
            origin={p.origin}
            description={p.description}
            price={p.price}
            img={p.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}
