import { css, useTheme } from '@emotion/react'
import React, { useEffect } from 'react'
import shuffleItems from '../utils/shuffleItems'
import Pricerunner from './Pricerunner'
import Product from './Product'
import Button from './Button'

export default function Products(props) {
  const theme = useTheme()
  const { blocketData, traderaData, shpockData, pricerunnerData } = props.items

  // save next page info into session to use it later if more info was needed
  useEffect(() => {
    const nextPage = {
      page: blocketData.next,
      od: shpockData.next,
    }
    sessionStorage.setItem('nextPage', JSON.stringify(nextPage))
  }, [])

  const products = shuffleItems([
    blocketData.items,
    traderaData.items,
    shpockData.items,
  ])
  return (
    <div
      css={css`
        height: auto;
        background-image: url('/product-background.svg');
        background-position-x: right;
      `}
    >
      {!!products.length ? ( //if there are any items to show
        <div
          css={css`
            width: 100%;
            max-width: 1200px;
            margin: auto;
            padding: 0 25px;
            text-align: center;
            position: relative;
            ${theme.mq[0]} {
              //1050px
              font-size: 0.8rem;
            }
            ${theme.mq[2]} {
              //768px
              padding: 0 10px;
            }
          `}
        >
          <Pricerunner data={pricerunnerData.items} />
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              ${theme.mq[2]} {
                //768px
                grid-template-columns: 1fr 1fr;
              }
              ${theme.mq[3]} {
                //576px
                grid-template-columns: 1fr;
              }
            `}
          >
            {products.map((p) => (
              <Product
                key={p.id}
                origin={p.origin}
                description={p.description}
                price={p.price}
                img={p.imageUrl}
                url={p.url}
              />
            ))}
          </div>
          <Button>Load more</Button>
        </div>
      ) : (
        <div
          css={css`
            height: 100vh;
            margin: 50px;
            margin-bottom: 0;
            text-align: center;
          `}
        >
          <h4>{'No results found :('}</h4>
        </div>
      )}
    </div>
  )
}
