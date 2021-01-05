import { css } from '@emotion/react'
import React from 'react'
import Product from './Product'

export default function Products(props) {
  const { items } = props
  const testData = [
    items.shpockData.items[0],
    items.blocketData.items[0],
    items.traderaData.items[0],
  ]
  console.log(items.pricerunnerData.items[0])
  return (
    <div
      css={css`
        height: 150vh;
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
          display: flex;
        `}
      >
        {/* <Product
          shpock
          name="iPhone 11 64GB"
          price="4700"
          img="https://i.blocketcdn.se/pictures/3198968584.jpg?type=original"
        /> */}
        {testData.map((i) => (
          <Product
            key={i.id}
            origin={i.origin}
            description={i.description}
            price={i.price}
            img={i.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}
