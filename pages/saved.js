import { css, useTheme } from '@emotion/react'
import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/client'
import React from 'react'
import Product from '../components/Product'

export default function Saved({ savedItems }) {
  const theme = useTheme()
  const items = JSON.parse(savedItems)
  return (
    <div
      css={css`
        background-image: url('/product-background.svg');
        background-position-x: right;
        height: auto;
        min-height: 100vh;
        /* padding-top: 150px; */
      `}
    >
      <div
        css={css`
          width: 100vw;
          height: 60px;
          position: relative;
          text-align: center;
          background-color: ${theme.colors.primary};
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
        `}
      ></div>
      {items && !!items.length ? ( //if there are any items to show
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
          <div
            css={css`
              text-align: left;
            `}
          >
            <h3>Dina sparade anonser:</h3>
          </div>
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
            {items.map((p) => (
              <Product
                key={p.id}
                id={p.id}
                origin={p.origin}
                description={p.description}
                price={p.price}
                img={p.imageUrl}
                url={p.url}
                saved
              />
            ))}
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
          <h4>{'Du har inga sparade anonser än'}</h4>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const prisma = new PrismaClient()

  let savedItems = null
  if (session) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      })
      savedItems = await prisma.savedAd.findMany({
        where: { userId: user.id },
      })
      console.log('savedItems:', savedItems)
    } catch (error) {
      console.log('error: ', error)
    }
  }
  savedItems = JSON.stringify(savedItems)
  console.log('savedAds: ', savedItems)
  return {
    props: { savedItems },
  }
}
