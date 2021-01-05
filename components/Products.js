import { css } from '@emotion/react'
import React from 'react'
import Product from './Product'

export default function Products() {
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
        <Product
          shpock
          name="iPhone 11 64GB"
          price="4700"
          img="https://i.blocketcdn.se/pictures/3198968584.jpg?type=original"
        />
        <Product
          blocket
          name="iPhone 11 64GB fasd fasf we faswc <sef weaf we"
          price="4700"
          img="https://i.blocketcdn.se/pictures/3198968584.jpg?type=original"
        />
        <Product
          tradera
          name="iPhone 11 64GB"
          price="4700"
          img="https://i.blocketcdn.se/pictures/3198968584.jpg?type=original"
        />
      </div>
    </div>
  )
}
