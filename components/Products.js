import { css, useTheme } from '@emotion/react'
import React, { useContext, useEffect, useState } from 'react'
import shuffleItems from '../utils/shuffleItems'
import Pricerunner from './Pricerunner'
import Product from './Product'
import Button from './Button'
import { Context } from '../utils/context'

export default function Products(props) {
  const theme = useTheme()
  const { blocketData, traderaData, shpockData, pricerunnerData } = props.items
  const [page, setPage] = useContext(Context).page
  const [pages, setPages] = useContext(Context).pages

  useEffect(() => {
    const next = {
      page: blocketData.next,
      od: shpockData.next,
    }

    //if next page is not in the pages list...
    if(!pages.find(p => p.page === next.page)){
      setPages([...pages, next])
    }
  }, [])


  const getIndexOfCurrentPage =()=> {
    return pages.findIndex(p => p.page === page.page)
  }
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
                id={p.id}
                origin={p.origin}
                description={p.description}
                price={p.price}
                img={p.imageUrl}
                url={p.url}
              />
            ))}
          </div>
          <div css={css`
            position: realtive;
            display: flex;
            flex-direction: row;
            justify-content: center;
            *{
              margin: 0 5px;
              margin-bottom: 15px;
            }
          `}>
            <Button disabled={getIndexOfCurrentPage()===0} onClick={()=>{
              window.scrollTo({ top: 500, behavior: 'smooth' })
              setTimeout(()=>setPage(pages[getIndexOfCurrentPage() - 1]), 700);
            }}>
              Tidigare
            </Button>
            <Button onClick={()=>{
              window.scrollTo({ top: 500, behavior: 'smooth' })
            }}>
              {page.page}
            </Button>
            <Button onClick={()=>{
              window.scrollTo({ top: 500, behavior: 'smooth' })
              setTimeout(()=>setPage(pages[getIndexOfCurrentPage() + 1]), 700);
              
            }}>Nästa</Button>
          </div>
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
          <h4>{'Ingenting hittades :('}</h4>
        </div>
      )}
    </div>
  )
}
