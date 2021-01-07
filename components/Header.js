import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { css, keyframes, useTheme } from '@emotion/react'

export default function Header() {
  const theme = useTheme()
  const [scale, setScale] = useState(0.7) //to resize all images
  useEffect(() => {
    //some responsivness stuff
    const width = window.innerWidth
    if (width < theme.breakpoints[0]) {
      setScale(0.6)
    }
    if (width < theme.breakpoints[3]) {
      setScale(0.5)
    }
  }, [])
  const dotsMove = (start, end) => keyframes`
  0% {
    transform: translateX(${start});
  }
  50% {
    transform: translateX(${end});
  }
  100% {
    transform: translateX(${start});
  }
`
  return (
    <div
      css={css`
        width: 100vw;
        height: 600px;
        position: relative;
        text-align: center;
        background-color: ${theme.colors.primary};
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 90%);
        ${theme.mq[1]} {
          //900px
          height: 650px;
        }
      `}
    >
      <div
        css={css`
          position: absolute;
          width: ${256 * scale + 'px'};
          height: ${338 * scale + 'px'};
          top: 5vh;
          left: 10vw;
          animation: ${dotsMove('0', '25vw')} 80s ease infinite;
        `}
      >
        <Image src="/dots.svg" layout="fill" />
      </div>
      <div
        css={css`
          position: absolute;
          width: ${256 * scale * 0.5 + 'px'};
          height: ${338 * scale * 0.5 + 'px'};
          bottom: 13vh;
          right: 10vw;
          animation: ${dotsMove('0', '-15vw')} 20s ease infinite;
        `}
      >
        <Image src="/dots.svg" layout="fill" />
      </div>
      <div
        css={css`
          position: absolute;
          width: ${276 * scale * 1 + 'px'};
          height: ${152 * scale * 1 + 'px'};
          top: 10vh;
          right: 20vw;
          animation: ${dotsMove('0', '10vw')} 60s ease infinite;
          ${theme.mq[3]} {
            //576px
            display: none;
          }
        `}
      >
        <Image src="/dots2.svg" layout="fill" />
      </div>
      <div
        className="test"
        css={css`
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 100%;
          display: flex;
          flex-direction: row;
          margin: auto;
          padding: 0 25px;
          ${theme.mq[1]} {
            //900px
            padding: 0;
            flex-direction: column;
          }
        `}
      >
        <div
          css={css`
            height: 100%;
            width: 40%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            * {
              text-shadow: 14px 14px 20px #0000004a;
            }
            ${theme.mq[1]} {
              //900px
              width: 100%;
              height: 100%;
              justify-content: flex-start;
              align-items: center;
              margin-top: 100px;
            }
          `}
        >
          <h4
            css={css`
              margin: 0;
            `}
          >
            Välkommen till
          </h4>
          <h1
            css={css`
              margin-left: 30px;
              ${theme.mq[1]} {
                //900px
                margin: 0;
                margin-top: 15px;
              }
              ${theme.mq[3]} {
                //576px
                font-size: 3rem;
              }
            `}
          >
            Shopium!
          </h1>
          <p2
            css={css`
              margin-left: 100px;
              margin-top: 5px;
              ${theme.mq[1]} {
                //900px
                margin: 0;
                margin-top: 50px;
              }
            `}
          >
            Ditt nya favoritställe för att handla begagnat :)
          </p2>
        </div>
        <div
          css={css`
            height: 100%;
            width: 60%;
            position: relative;
            ${theme.mq[1]} {
              //900px
              height: 100%;
              width: 100%;
              position: absolute;
            }
          `}
        >
          <div
            css={css`
              position: absolute;
              bottom: 10%;
              left: 4%;
              filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
              ${theme.mq[1]} {
                //900px
                bottom: 10%;
                left: 5%;
              }
              ${theme.mq[3]} {
                //576px
                bottom: 17%;
                left: 2%;
              }
            `}
          >
            <Image
              src="/headphone.png"
              priority={true}
              width={272 * scale}
              height={299 * scale}
              // quality="100"      //NOTE: add this if the header quality is too low
            />
          </div>
          <div
            css={css`
              position: absolute;
              bottom: 10%;
              left: 38%;
              filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
              ${theme.mq[1]} {
                //900px
                bottom: 7%;
                left: 35%;
              }
              ${theme.mq[3]} {
                //576px
                left: 35%;
              }
            `}
          >
            <Image
              src="/keyboard.png"
              priority={true}
              width={436 * scale}
              height={186 * scale}
              // quality="100"      //NOTE: add this if the header quality is too low
            />
          </div>
          <div
            css={css`
              position: absolute;
              top: 38%;
              right: 32%;
              filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
              ${theme.mq[1]} {
                //900px
                top: 55%;
                right: 38%;
              }
              ${theme.mq[3]} {
                //576px
                top: 60%;
              }
            `}
          >
            <Image
              src="/pen.png"
              priority={true}
              width={25 * scale}
              height={203 * scale}
              // quality="100"      //NOTE: add this if the header quality is too low
            />
          </div>
          <div
            css={css`
              position: absolute;
              bottom: 10%;
              right: 0%;
              filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
              ${theme.mq[1]} {
                //900px
                bottom: 8%;
                right: 20%;
              }
              ${theme.mq[3]} {
                //576px
                display: none;
              }
            `}
          >
            <Image
              src="/mouse.png"
              priority={true}
              width={88 * scale}
              height={173 * scale}
              // quality="100"      //NOTE: add this if the header quality is too low
            />
          </div>
          <div
            css={css`
              position: absolute;
              top: 25%;
              right: 5%;
              filter: drop-shadow(8px 9px 18px rgba(0, 0, 0, 0.26));
              ${theme.mq[1]} {
                //900px
                top: 40%;
                right: 15%;
              }
              ${theme.mq[3]} {
                //576px
                top: 53%;
                right: 5%;
              }
            `}
          >
            <Image
              src="/notebook.png"
              priority={true}
              width={197 * scale}
              height={312 * scale}
              // quality="100"      //NOTE: add this if the header quality is too low
            />
          </div>
          {/********************************************** */}
          <div
            css={css`
              position: absolute;
              top: 22%;
              left: 10%;
              ${theme.mq[1]} {
                //900px
                top: 50%;
                left: 35%;
              }
              ${theme.mq[3]} {
                //576px
                top: 40%;
                left: 30%;
              }
            `}
          >
            <Image
              src="/spara80.svg"
              priority={true}
              width={253 * scale}
              height={279 * scale}
              // quality="100"      //NOTE: add this if the header quality is too low
            />
          </div>
          <div
            css={css`
              position: absolute;
              top: 25%;
              left: 40%;
              ${theme.mq[1]} {
                //900px
                top: 8%;
                left: 70%;
              }
            `}
          >
            <Image
              src="/miljövänligt.svg"
              priority={true}
              width={233 * scale}
              height={179 * scale}
              // quality="100"      //NOTE: add this if the header quality is too low
            />
          </div>
          <div
            css={css`
              position: absolute;
              bottom: 37%;
              left: 30%;
              ${theme.mq[1]} {
                //900px
                bottom: 40%;
                left: 5%;
              }
            `}
          >
            <Image
              src="/hållbart.svg"
              priority={true}
              width={191 * scale}
              height={184 * scale}
              // quality="100"      //NOTE: add this if the header quality is too low
            />
          </div>
          <div
            css={css`
              position: absolute;
              bottom: 30%;
              right: 35%;
              width: ${193 * scale + 'px'};
              height: ${200 * scale + 'px'};
              ${theme.mq[1]} {
                //900px
                bottom: 70%;
                right: 80%;
                width: ${193 * 1.2 * scale + 'px'};
                height: ${200 * 1.2 * scale + 'px'};
              }
              ${theme.mq[3]} {
                //576px
                bottom: 75%;
                right: 70%;
              }
            `}
          >
            <Image
              src="/billigt.svg"
              priority={true}
              // width={193 * 1.2 * scale}
              // height={200 * 1.2 * scale}
              layout="fill"
              // quality="100"      //NOTE: add this if the header quality is too low
            />
          </div>
        </div>
      </div>
    </div>
  )
}
